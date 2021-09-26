from django.db import models

# Create your models here.

class Category(models.Model):
    id = models.AutoField(primary_key=True, editable=False, db_column='id')
    category_name = models.CharField(max_length=64, db_column='category_name')

    class Meta:
        # managed = False
        db_table = "category"

    def __str__(self):
        return str(self.category_name)

class Brand(models.Model):
    id = models.AutoField(primary_key=True, editable=False, db_column='id')
    brand_name = models.CharField(max_length=64, db_column='brand_name')

    class Meta:
        # managed = False
        db_table = "brand"
        
    def __str__(self):
        return str(self.brand_name)

class Product(models.Model):
    id = models.AutoField(primary_key=True, editable=False, db_column='id')
    product_name = models.CharField(max_length=64, db_column='product_name')
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE, db_column='brand')
    model = models.CharField(max_length=64, db_column='model')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, db_column='category')
    sub_category = models.CharField(max_length=64, db_column='sub_category')
    composition = models.CharField(max_length=64, db_column='composition')
    uom = models.CharField(max_length=64, db_column='uom')
    creation_time = models.DateTimeField(auto_now_add=True, db_column='timestamp')

    class Meta:
        # managed = False
        db_table = "product"
        
    def __str__(self):
        return str(self.product_name)
