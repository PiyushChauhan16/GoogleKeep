from django.contrib import admin
from django.urls import path, include
from home import views

urlpatterns = [
    path ("", views.signup, name = "signup"),
    path ("/index", views.index, name = "home"),
    path ("/login", views.login, name = "login")
]
