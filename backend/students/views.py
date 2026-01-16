from rest_framework import viewsets, status
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from django.db.models import Q
from .models import Student
from .serializers import StudentSerializer


@api_view(['POST'])
@permission_classes([AllowAny])
def custom_login(request):
    """Custom login endpoint that matches frontend expectations"""
    username = request.data.get('username')
    password = request.data.get('password')
    
    if not username or not password:
        return Response(
            {'error': 'Username va parol kiritilishi shart'},
            status=status.HTTP_400_BAD_REQUEST
        )
    
    user = authenticate(username=username, password=password)
    
    if user is None:
        return Response(
            {'error': 'Noto\'g\'ri foydalanuvchi nomi yoki parol'},
            status=status.HTTP_401_UNAUTHORIZED
        )
    
    refresh = RefreshToken.for_user(user)
    
    return Response({
        'access': str(refresh.access_token),
        'refresh': str(refresh),
        'user': {
            'id': user.id,
            'username': user.username
        }
    })


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Student.objects.all()
        search = self.request.query_params.get('search', None)
        if search:
            queryset = queryset.filter(
                Q(full_name__icontains=search) |
                Q(id__icontains=search) |
                Q(group__icontains=search) |
                Q(major__icontains=search) |
                Q(citizenship__icontains=search)
            )
        return queryset

    @action(detail=False, methods=['get'])
    def stats(self, request):
        """Get statistics for dashboard"""
        from django.utils import timezone
        from datetime import timedelta
        
        students = Student.objects.all()
        total_students = students.count()
        
        # Calculate fully paid count
        fully_paid = 0
        expiring_registration = 0
        dormitory_residents = 0
        
        for student in students:
            # Check if fully paid
            tuition_remaining = float(student.tuition_total) - float(student.tuition_paid)
            registration_remaining = float(student.registration_fee_total) - float(student.registration_fee_paid)
            
            # Calculate dormitory balance
            dormitory_balance = 0
            if student.dormitory_status != 'None':
                dormitory_residents += 1
                if student.dormitory_monthly_rate and student.dormitory_check_in_date and student.dormitory_planned_checkout_date:
                    from datetime import datetime
                    check_in = student.dormitory_check_in_date
                    checkout = student.dormitory_planned_checkout_date
                    months = (checkout.year - check_in.year) * 12 + (checkout.month - check_in.month)
                    total_planned = float(student.dormitory_monthly_rate) * months
                    paid = float(student.dormitory_paid_amount or 0)
                    dormitory_balance = total_planned - paid
            
            if tuition_remaining <= 0 and registration_remaining <= 0 and dormitory_balance <= 0:
                fully_paid += 1
            
            # Check expiring registration
            if student.registration_end_date:
                days_left = (student.registration_end_date - timezone.now().date()).days
                if days_left <= 10:
                    expiring_registration += 1
        
        return Response({
            'totalStudents': total_students,
            'fullyPaid': fully_paid,
            'expiringRegistration': expiring_registration,
            'dormitoryResidents': dormitory_residents
        })
