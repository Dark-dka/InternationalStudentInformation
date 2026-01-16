from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from students.models import Student
from datetime import datetime, timedelta
from decimal import Decimal


class Command(BaseCommand):
    help = 'Creates demo user and sample student data'

    def handle(self, *args, **options):
        # Create demo user
        username = 'admin'
        password = 'admin'
        
        if not User.objects.filter(username=username).exists():
            User.objects.create_user(username=username, password=password)
            self.stdout.write(
                self.style.SUCCESS(f'Demo user yaratildi: username={username}, password={password}')
            )
        else:
            self.stdout.write(self.style.WARNING(f'Foydalanuvchi "{username}" allaqachon mavjud'))

        # Create sample students if none exist
        if Student.objects.count() == 0:
            today = datetime.now().date()
            
            students_data = [
                {
                    'id': 'STU-001',
                    'full_name': 'Aliyev Jamshid',
                    'date_of_birth': '2002-03-15',
                    'passport_number': 'AA1234567',
                    'jshir': '12345678901234',
                    'citizenship': 'Uzbekistan',
                    'phone': '+99890 123 45 67',
                    'email': 'jamshid.aliyev@example.com',
                    'emergency_contact_name': 'Aliyev Odil',
                    'emergency_contact_phone': '+99890 765 43 21',
                    'group': 'CS-21-1',
                    'course_year': 3,
                    'major': 'Computer Science',
                    'language': 'English',
                    'visa_type': 'Student Visa',
                    'visa_start_date': today - timedelta(days=180),
                    'visa_end_date': today + timedelta(days=20),
                    'registration_start_date': today - timedelta(days=90),
                    'registration_end_date': today + timedelta(days=8),
                    'registration_address_type': 'Dormitory',
                    'registration_address_details': 'Dormitory 2, Room 314',
                    'tuition_total': Decimal('2800.00'),
                    'tuition_paid': Decimal('2000.00'),
                    'registration_fee_total': Decimal('300.00'),
                    'registration_fee_paid': Decimal('300.00'),
                    'dormitory_status': 'Normal',
                    'dormitory_check_in_date': today - timedelta(days=270),
                    'dormitory_planned_checkout_date': today + timedelta(days=90),
                    'dormitory_monthly_rate': Decimal('40.00'),
                    'dormitory_paid_amount': Decimal('260.00'),
                },
                {
                    'id': 'STU-002',
                    'full_name': 'Wang Li',
                    'date_of_birth': '2001-11-02',
                    'passport_number': 'CN9876543',
                    'jshir': '56789012345678',
                    'citizenship': 'China',
                    'phone': '+86 136 1234 5678',
                    'email': 'li.wang@example.com',
                    'emergency_contact_name': 'Wang Mei',
                    'emergency_contact_phone': '+86 136 8765 4321',
                    'group': 'IB-20-2',
                    'course_year': 4,
                    'major': 'International Business',
                    'language': 'Russian',
                    'visa_type': 'Student Visa',
                    'visa_start_date': today - timedelta(days=365),
                    'visa_end_date': today + timedelta(days=5),
                    'registration_start_date': today - timedelta(days=150),
                    'registration_end_date': today + timedelta(days=2),
                    'registration_address_type': 'Other',
                    'registration_address_details': 'Tashkent, Mirzo Ulugbek district',
                    'tuition_total': Decimal('2800.00'),
                    'tuition_paid': Decimal('1500.00'),
                    'registration_fee_total': Decimal('300.00'),
                    'registration_fee_paid': Decimal('150.00'),
                    'dormitory_status': 'VIP',
                    'dormitory_check_in_date': today - timedelta(days=330),
                    'dormitory_planned_checkout_date': today + timedelta(days=30),
                    'dormitory_monthly_rate': Decimal('80.00'),
                    'dormitory_paid_amount': Decimal('640.00'),
                },
                {
                    'id': 'STU-003',
                    'full_name': 'John Smith',
                    'date_of_birth': '2003-07-21',
                    'passport_number': 'US7654321',
                    'jshir': '78901234567890',
                    'citizenship': 'USA',
                    'phone': '+1 555 210 9876',
                    'email': 'john.smith@example.com',
                    'emergency_contact_name': 'Anna Smith',
                    'emergency_contact_phone': '+1 555 333 7777',
                    'group': 'MED-22-1',
                    'course_year': 2,
                    'major': 'General Medicine',
                    'language': 'English',
                    'visa_type': 'Student Visa',
                    'visa_start_date': today - timedelta(days=120),
                    'visa_end_date': today + timedelta(days=60),
                    'registration_start_date': today - timedelta(days=60),
                    'registration_end_date': today + timedelta(days=40),
                    'registration_address_type': 'Dormitory',
                    'registration_address_details': 'Dormitory 1, Room 210',
                    'tuition_total': Decimal('2800.00'),
                    'tuition_paid': Decimal('2800.00'),
                    'registration_fee_total': Decimal('300.00'),
                    'registration_fee_paid': Decimal('300.00'),
                    'dormitory_status': 'None',
                },
            ]
            
            for student_data in students_data:
                Student.objects.create(**student_data)
            
            self.stdout.write(
                self.style.SUCCESS(f'{len(students_data)} ta demo talaba yaratildi')
            )
        else:
            self.stdout.write(self.style.WARNING('Talabalar allaqachon mavjud'))
