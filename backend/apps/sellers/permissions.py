from rest_framework.permissions import BasePermission


class IsSellerOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.user == request.user


class IsApprovedSeller(BasePermission):
    message = "You must be an approved seller."

    def has_permission(self, request, view):
        return (
            request.user.is_authenticated
            and hasattr(request.user, "seller_profile")
            and request.user.seller_profile.is_approved
        )
