# C:\Users\sash710\avre\cannaUNITY\backend\config\urls.py

from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from interface.views import index_view

# REST-Framework-Router für ViewSets
from rooms.api_views import RoomViewSet
from options.api_views import OptionListAPIView
from buchhaltung.views_api import BookingJournalAPIView
from members.views_auth import login_view, logout_view

# Router für die importierten ViewSets
router = DefaultRouter()
router.register(r'rooms', RoomViewSet)

urlpatterns = [
    # 🔐 Adminbereich
    path('admin/', admin.site.urls),

    # 🌐 API-Routen für ViewSets
    path('api/', include(router.urls)),

    # 🔑 Authentifizierung & Benutzerinfos
    path('api/login/', login_view),
    path('api/logout/', logout_view),
    path('api/token/', obtain_auth_token, name='api_token'),
    
    # Members API-Routen einbinden (inkl. user_info und Integration)
    path('', include('members.api_urls')),

    # 🏡 Startseite (SPA wird hier geladen)
    path('', index_view, name='index'),

    # 🔐 UniFi-Zugriffs-API - mit eindeutigen Namespaces
    path('unifi_access/', include('unifi_access.urls', namespace='unifi_access_web')),      # Für Port 8000 (Django direkt)
    path('api/unifi_access/', include('unifi_access.urls', namespace='unifi_access_api')),  # Für React-Testserver

    # ⚙️ Optionen-API für React (Globale Einstellungen)
    path('api/options/', include('options.api_urls')),  # 💥 NEU: komplett eingebunden!

    # 💰 Buchhaltungs-API
    path('api/buchhaltung/', include('buchhaltung.urls')),
    path('api/buchhaltung/journal/', BookingJournalAPIView.as_view(), name="api-booking-journal"),
    path('buchhaltung/journal/', BookingJournalAPIView.as_view(), name='booking-journal'),

    # ⚙️ UUID Track and Trace
    path('api/trackandtrace/', include('trackandtrace.urls')),

    path('api/', include('rooms.api_urls')),
]