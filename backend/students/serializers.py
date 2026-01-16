from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    # Transform to match frontend structure
    fullName = serializers.CharField(source='full_name')
    dateOfBirth = serializers.DateField(source='date_of_birth')
    passportNumber = serializers.CharField(source='passport_number')
    emergencyContactName = serializers.CharField(source='emergency_contact_name', allow_null=True)
    emergencyContactPhone = serializers.CharField(source='emergency_contact_phone', allow_null=True)
    
    # Academic nested structure
    academic = serializers.SerializerMethodField()
    
    # Visa nested structure
    visa = serializers.SerializerMethodField()
    
    # Payment nested structures
    tuition = serializers.SerializerMethodField()
    registrationFee = serializers.SerializerMethodField()
    
    # Dormitory nested structure
    dormitory = serializers.SerializerMethodField()

    class Meta:
        model = Student
        fields = [
            'id', 'fullName', 'dateOfBirth', 'passportNumber', 'jshir',
            'citizenship', 'phone', 'email', 'emergencyContactName',
            'emergencyContactPhone', 'academic', 'visa', 'tuition',
            'registrationFee', 'dormitory'
        ]

    def get_academic(self, obj):
        return {
            'group': obj.group,
            'courseYear': obj.course_year,
            'major': obj.major,
            'language': obj.language
        }

    def get_visa(self, obj):
        return {
            'visaType': obj.visa_type,
            'visaStartDate': obj.visa_start_date.isoformat() if obj.visa_start_date else '',
            'visaEndDate': obj.visa_end_date.isoformat() if obj.visa_end_date else '',
            'registrationStartDate': obj.registration_start_date.isoformat() if obj.registration_start_date else '',
            'registrationEndDate': obj.registration_end_date.isoformat() if obj.registration_end_date else '',
            'registrationAddressType': obj.registration_address_type,
            'registrationAddressDetails': obj.registration_address_details or ''
        }

    def get_tuition(self, obj):
        return {
            'total': float(obj.tuition_total),
            'paid': float(obj.tuition_paid)
        }

    def get_registrationFee(self, obj):
        return {
            'total': float(obj.registration_fee_total),
            'paid': float(obj.registration_fee_paid)
        }

    def get_dormitory(self, obj):
        dormitory_data = {
            'status': obj.dormitory_status
        }
        if obj.dormitory_check_in_date:
            dormitory_data['checkInDate'] = obj.dormitory_check_in_date.isoformat()
        if obj.dormitory_planned_checkout_date:
            dormitory_data['plannedCheckoutDate'] = obj.dormitory_planned_checkout_date.isoformat()
        if obj.dormitory_actual_checkout_date:
            dormitory_data['actualCheckoutDate'] = obj.dormitory_actual_checkout_date.isoformat()
        if obj.dormitory_monthly_rate:
            dormitory_data['monthlyRate'] = float(obj.dormitory_monthly_rate)
        if obj.dormitory_paid_amount:
            dormitory_data['paidAmount'] = float(obj.dormitory_paid_amount)
        return dormitory_data

    def create(self, validated_data):
        # Extract nested data
        academic_data = self.initial_data.get('academic', {})
        visa_data = self.initial_data.get('visa', {})
        tuition_data = self.initial_data.get('tuition', {})
        registration_fee_data = self.initial_data.get('registrationFee', {})
        dormitory_data = self.initial_data.get('dormitory', {})

        # Generate ID if not provided
        student_id = validated_data.get('id') or self.initial_data.get('id')
        if not student_id or student_id == 'NEW':
            # Generate new ID
            last_student = Student.objects.order_by('-id').first()
            if last_student:
                try:
                    num = int(last_student.id.split('-')[1])
                    student_id = f"STU-{str(num + 1).zfill(3)}"
                except:
                    student_id = "STU-001"
            else:
                student_id = "STU-001"
        
        # Create student
        student = Student.objects.create(
            id=student_id,
            full_name=validated_data.get('full_name', validated_data.get('fullName', '')),
            date_of_birth=validated_data.get('date_of_birth', validated_data.get('dateOfBirth')),
            passport_number=validated_data.get('passport_number', validated_data.get('passportNumber', '')),
            jshir=validated_data.get('jshir', ''),
            citizenship=validated_data.get('citizenship', ''),
            phone=validated_data.get('phone', ''),
            email=validated_data.get('email', ''),
            emergency_contact_name=validated_data.get('emergency_contact_name', validated_data.get('emergencyContactName', '')),
            emergency_contact_phone=validated_data.get('emergency_contact_phone', validated_data.get('emergencyContactPhone', '')),
            # Academic
            group=academic_data.get('group', ''),
            course_year=academic_data.get('courseYear', 1),
            major=academic_data.get('major', ''),
            language=academic_data.get('language', 'English'),
            # Visa
            visa_type=visa_data.get('visaType', 'Student Visa'),
            visa_start_date=visa_data.get('visaStartDate') or None,
            visa_end_date=visa_data.get('visaEndDate') or None,
            registration_start_date=visa_data.get('registrationStartDate') or None,
            registration_end_date=visa_data.get('registrationEndDate') or None,
            registration_address_type=visa_data.get('registrationAddressType', 'Dormitory'),
            registration_address_details=visa_data.get('registrationAddressDetails', ''),
            # Tuition
            tuition_total=tuition_data.get('total', 2800.00),
            tuition_paid=tuition_data.get('paid', 0.00),
            # Registration Fee
            registration_fee_total=registration_fee_data.get('total', 300.00),
            registration_fee_paid=registration_fee_data.get('paid', 0.00),
            # Dormitory
            dormitory_status=dormitory_data.get('status', 'None'),
            dormitory_check_in_date=dormitory_data.get('checkInDate') or None,
            dormitory_planned_checkout_date=dormitory_data.get('plannedCheckoutDate') or None,
            dormitory_actual_checkout_date=dormitory_data.get('actualCheckoutDate') or None,
            dormitory_monthly_rate=dormitory_data.get('monthlyRate') or None,
            dormitory_paid_amount=dormitory_data.get('paidAmount') or None,
        )
        return student

    def update(self, instance, validated_data):
        # Extract nested data
        academic_data = self.initial_data.get('academic', {})
        visa_data = self.initial_data.get('visa', {})
        tuition_data = self.initial_data.get('tuition', {})
        registration_fee_data = self.initial_data.get('registrationFee', {})
        dormitory_data = self.initial_data.get('dormitory', {})

        # Update basic fields
        instance.full_name = validated_data.get('full_name', instance.full_name)
        instance.date_of_birth = validated_data.get('date_of_birth', instance.date_of_birth)
        instance.passport_number = validated_data.get('passport_number', instance.passport_number)
        instance.jshir = validated_data.get('jshir', instance.jshir)
        instance.citizenship = validated_data.get('citizenship', instance.citizenship)
        instance.phone = validated_data.get('phone', instance.phone)
        instance.email = validated_data.get('email', instance.email)
        instance.emergency_contact_name = validated_data.get('emergency_contact_name', instance.emergency_contact_name)
        instance.emergency_contact_phone = validated_data.get('emergency_contact_phone', instance.emergency_contact_phone)

        # Update academic
        if academic_data:
            instance.group = academic_data.get('group', instance.group)
            instance.course_year = academic_data.get('courseYear', instance.course_year)
            instance.major = academic_data.get('major', instance.major)
            instance.language = academic_data.get('language', instance.language)

        # Update visa
        if visa_data:
            instance.visa_type = visa_data.get('visaType', instance.visa_type)
            instance.visa_start_date = visa_data.get('visaStartDate') or None
            instance.visa_end_date = visa_data.get('visaEndDate') or None
            instance.registration_start_date = visa_data.get('registrationStartDate') or None
            instance.registration_end_date = visa_data.get('registrationEndDate') or None
            instance.registration_address_type = visa_data.get('registrationAddressType', instance.registration_address_type)
            instance.registration_address_details = visa_data.get('registrationAddressDetails', instance.registration_address_details)

        # Update tuition
        if tuition_data:
            instance.tuition_total = tuition_data.get('total', instance.tuition_total)
            instance.tuition_paid = tuition_data.get('paid', instance.tuition_paid)

        # Update registration fee
        if registration_fee_data:
            instance.registration_fee_total = registration_fee_data.get('total', instance.registration_fee_total)
            instance.registration_fee_paid = registration_fee_data.get('paid', instance.registration_fee_paid)

        # Update dormitory
        if dormitory_data:
            instance.dormitory_status = dormitory_data.get('status', instance.dormitory_status)
            instance.dormitory_check_in_date = dormitory_data.get('checkInDate') or None
            instance.dormitory_planned_checkout_date = dormitory_data.get('plannedCheckoutDate') or None
            instance.dormitory_actual_checkout_date = dormitory_data.get('actualCheckoutDate') or None
            instance.dormitory_monthly_rate = dormitory_data.get('monthlyRate') or None
            instance.dormitory_paid_amount = dormitory_data.get('paidAmount') or None

        instance.save()
        return instance
