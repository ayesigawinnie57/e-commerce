from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ("email", "full_name", "role", "is_active", "is_verified", "date_joined")
    list_filter = ("role", "is_active", "is_verified", "is_staff")
    search_fields = ("email", "first_name", "last_name", "phone")
    ordering = ("-date_joined",)
    readonly_fields = ("date_joined", "created_at", "updated_at")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal Info", {"fields": ("first_name", "last_name", "phone", "profile_image")}),
        ("Permissions", {"fields": ("role", "is_active", "is_staff", "is_superuser", "is_verified", "groups", "user_permissions")}),
        ("Dates", {"fields": ("date_joined", "created_at", "updated_at")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "first_name", "last_name", "role", "password1", "password2"),
        }),
    )
