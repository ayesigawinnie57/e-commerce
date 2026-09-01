from .base import *

DEBUG = True

ALLOWED_HOSTS = ["*"]

# Show emails in console during development
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# DRF browsable API in dev
REST_FRAMEWORK["DEFAULT_RENDERER_CLASSES"] = (
    "rest_framework.renderers.JSONRenderer",
    "rest_framework.renderers.BrowsableAPIRenderer",
)
