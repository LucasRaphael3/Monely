from django.urls import re_path
from .consumers import FinanceConsumer

websocket_urlpatterns = [
    re_path(r'ws/finances/$', FinanceConsumer.as_asgi()),
]