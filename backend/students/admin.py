from django.contrib import admin
from .models import Student


@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['id', 'full_name', 'citizenship', 'group', 'course_year', 'major']
    list_filter = ['citizenship', 'course_year', 'language', 'dormitory_status']
    search_fields = ['id', 'full_name', 'passport_number', 'email', 'group']
    readonly_fields = ['created_at', 'updated_at']
