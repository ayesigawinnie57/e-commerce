from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    if response is not None:
        errors = response.data if isinstance(response.data, dict) else {"detail": response.data}
        message = errors.pop("detail", "An error occurred.")
        if hasattr(message, "code"):
            message = str(message)
        response.data = {
            "success": False,
            "message": message,
            "errors": errors,
        }
    return response
