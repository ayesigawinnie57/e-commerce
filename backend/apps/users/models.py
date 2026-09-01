from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.db import models
from apps.common.models import TimeStampedModel


class UserRole(models.TextChoices):
    CUSTOMER = "customer", "Customer"
    SELLER = "seller", "Seller"
    STAFF = "staff", "Staff"
    ADMIN = "admin", "Admin"


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required.")
        email = self.normalize_email(email)
        extra_fields.setdefault("role", UserRole.CUSTOMER)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.update(
            {"is_staff": True, "is_superuser": True, "role": UserRole.ADMIN, "is_verified": True}
        )
        return self.create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin, TimeStampedModel):
    email = models.EmailField(unique=True, db_index=True)
    phone = models.CharField(max_length=20, blank=True, null=True, unique=True, db_index=True)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    profile_image = models.ImageField(upload_to="users/profiles/", blank=True, null=True)
    role = models.CharField(max_length=20, choices=UserRole.choices, default=UserRole.CUSTOMER)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    objects = UserManager()

    class Meta:
        db_table = "users"
        indexes = [models.Index(fields=["email"]), models.Index(fields=["role"])]

    def __str__(self):
        return self.email

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}".strip()

    @property
    def is_seller(self):
        return self.role == UserRole.SELLER

    @property
    def is_customer(self):
        return self.role == UserRole.CUSTOMER

    @property
    def is_admin(self):
        return self.role == UserRole.ADMIN
