from django.db import models
from django.core.validators import MinValueValidator


class Student(models.Model):
    LANGUAGE_CHOICES = [
        ('Russian', 'Russian'),
        ('English', 'English'),
        ('Uzbek', 'Uzbek'),
    ]
    
    DORMITORY_STATUS_CHOICES = [
        ('None', 'None'),
        ('Normal', 'Normal'),
        ('VIP', 'VIP'),
    ]
    
    REGISTRATION_ADDRESS_TYPE_CHOICES = [
        ('Dormitory', 'Dormitory'),
        ('Other', 'Other'),
    ]

    # Personal Information
    id = models.CharField(max_length=20, primary_key=True)
    full_name = models.CharField(max_length=200)
    date_of_birth = models.DateField()
    passport_number = models.CharField(max_length=50, unique=True)
    jshir = models.CharField(max_length=20, blank=True, null=True)
    citizenship = models.CharField(max_length=100)
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    emergency_contact_name = models.CharField(max_length=200, blank=True, null=True)
    emergency_contact_phone = models.CharField(max_length=20, blank=True, null=True)

    # Academic Information
    group = models.CharField(max_length=50)
    course_year = models.IntegerField(validators=[MinValueValidator(1)])
    major = models.CharField(max_length=200)
    language = models.CharField(max_length=10, choices=LANGUAGE_CHOICES, default='English')

    # Visa and Registration Information
    visa_type = models.CharField(max_length=50, default='Student Visa')
    visa_start_date = models.DateField(blank=True, null=True)
    visa_end_date = models.DateField(blank=True, null=True)
    registration_start_date = models.DateField(blank=True, null=True)
    registration_end_date = models.DateField(blank=True, null=True)
    registration_address_type = models.CharField(
        max_length=20,
        choices=REGISTRATION_ADDRESS_TYPE_CHOICES,
        default='Dormitory'
    )
    registration_address_details = models.TextField(blank=True, null=True)

    # Tuition Payment
    tuition_total = models.DecimalField(max_digits=10, decimal_places=2, default=2800.00)
    tuition_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    # Registration Fee Payment
    registration_fee_total = models.DecimalField(max_digits=10, decimal_places=2, default=300.00)
    registration_fee_paid = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)

    # Dormitory Information
    dormitory_status = models.CharField(
        max_length=10,
        choices=DORMITORY_STATUS_CHOICES,
        default='None'
    )
    dormitory_check_in_date = models.DateField(blank=True, null=True)
    dormitory_planned_checkout_date = models.DateField(blank=True, null=True)
    dormitory_actual_checkout_date = models.DateField(blank=True, null=True)
    dormitory_monthly_rate = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    dormitory_paid_amount = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.full_name} ({self.id})"
