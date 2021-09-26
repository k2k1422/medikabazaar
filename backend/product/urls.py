"""product URL Configuration

"""
from django.urls import path
from product import views

urlpatterns = [
    # Your URLs...
  
    path('createProduct/', views.createProduct, name='createProduct'),
    path('productSearch/', views.productSearch, name='productSearch'),
]
