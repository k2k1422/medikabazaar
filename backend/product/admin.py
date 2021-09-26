from django.contrib import admin
from product.models import *
# Register your models here.


@admin.register(Brand)
class Brand(admin.ModelAdmin):
    list_display = (
        "id","brand_name",
    )

@admin.register(Category)
class Category(admin.ModelAdmin):
    list_display = (
        "id","category_name",
    )

@admin.register(Product)
class Product(admin.ModelAdmin):
    list_display = (
        "id","product_name","brand","model","category","sub_category","composition","uom","creation_time",
    )