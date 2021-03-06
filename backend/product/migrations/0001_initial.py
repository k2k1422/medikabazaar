# Generated by Django 3.1.5 on 2021-09-22 06:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Brand',
            fields=[
                ('id', models.AutoField(db_column='id', editable=False, primary_key=True, serialize=False)),
                ('brand_name', models.CharField(db_column='brand_name', max_length=64)),
            ],
            options={
                'db_table': 'brand',
            },
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(db_column='id', editable=False, primary_key=True, serialize=False)),
                ('category_name', models.CharField(db_column='category_name', max_length=64)),
            ],
            options={
                'db_table': 'category',
            },
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.AutoField(db_column='id', editable=False, primary_key=True, serialize=False)),
                ('product_name', models.CharField(db_column='product_name', max_length=64)),
                ('model', models.CharField(db_column='model', max_length=64)),
                ('sub_category', models.CharField(db_column='sub_category', max_length=64)),
                ('composition', models.CharField(db_column='composition', max_length=64)),
                ('uom', models.CharField(db_column='uom', max_length=64)),
                ('brand', models.ForeignKey(db_column='brand', on_delete=django.db.models.deletion.CASCADE, to='product.brand')),
                ('category', models.ForeignKey(db_column='category', on_delete=django.db.models.deletion.CASCADE, to='product.category')),
            ],
            options={
                'db_table': 'product',
            },
        ),
    ]
