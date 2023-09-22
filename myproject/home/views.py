from django.shortcuts import render, HttpResponse, redirect
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

# Create your views here.

def index (request):
    return render (request, "googleKeepClone.html")

def login (request):
    if (request.method == "POST"):
        email = request.POST["email"]
        password = request.POST["password"]

        user = authenticate (email, password)
        if user is not None:
            return redirect ("index")
        else:
            return redirect ("/")

    return render (request, "login.html")

def signup (request):
    print (request.method)
    if (request.method == "POST"):
        email = request.POST["email"]
        password = request.POST["password"]

        print (email, password)
        user = User.objects.create_user  (email, password)
        user.save ()

        return redirect ("login")
    
    return render (request, "signup.html")
