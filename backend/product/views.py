from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from product.models import *
from product.serializers import *
import requests
import json
import os
# Create your views here.


@api_view(["POST"])
# @has_custom_permissions('GMP.OOS_report.read', 'GCP.deviation_report.write', '')
def createProduct(request):
    try:
        request_body = request.data
        brand_id = None
        category_id = None

        # create brand if dosen't exit
        query_set = Brand.objects.filter(brand_name=request_body["brand_name"])
        if query_set.exists():
            brand_id = query_set[0].id
        else:
            brandSerializer = BrandSerializer(data={
                "brand_name": request_body["brand_name"]
            })
            if brandSerializer.is_valid():
                brandSerializer.save()
                brand_id = brandSerializer.data["id"]
            else:
                raise Exception(brandSerializer.errors)

        # create category if dosen't exit
        query_set = Category.objects.filter(
            category_name=request_body["category_name"])
        if query_set.exists():
            category_id = query_set[0].id
        else:
            categorySerializer = CategorySerializer(data={
                "category_name": request_body["category_name"]
            })
            if categorySerializer.is_valid():
                categorySerializer.save()
                category_id = categorySerializer.data["id"]
            else:
                raise Exception(categorySerializer.errors)

        # create product anyway as the product name is unique field
        productSerializer = ProductSerializer(data={
            "product_name": request_body["product_name"],
            "brand": brand_id,
            "model": request_body["model"],
            "category": category_id,
            "sub_category": request_body["sub_category"],
            "composition": request_body["composition"],
            "uom": request_body["uom"],
        })
        if productSerializer.is_valid():
            productSerializer.save()
        else:
            raise Exception(productSerializer.errors)

        return Response({"message": "sucessful"}, status.HTTP_201_CREATED)

    except Exception as ex:
        return Response({"error": str(ex)}, status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
# @has_custom_permissions('GMP.OOS_report.read', 'GCP.deviation_report.write', '')
def productSearch(request):
    try:
        request_body = request.data
        url = os.getenv("ELASTIC_SEARCH_URL")
        print(request_body["category_name"],
              request_body["brand_name"],
              request_body["product_name"])
        payload = {
            "query": {
                "bool": {
                    "must": [
                        {
                            "regexp": {
                                "category_name": ".*"+request_body["category_name"]+".*"
                            }
                        },
                        {
                            "regexp": {
                                "brand_name": ".*"+request_body["brand_name"]+".*"
                            }
                        },
                        {
                            "regexp": {
                                "product_name": ".*"+request_body["product_name"]+".*"
                            }
                        }
                    ]
                }
            }
        }

        headers = {
            'Content-Type': 'application/json'
        }

        payload = json.dumps(payload)
        response = requests.request("GET", url, headers=headers, data=payload)
        response_dict = json.loads(response.text)

        return Response(response_dict, status.HTTP_201_CREATED)

    except Exception as ex:
        return Response({"error": str(ex)}, status.HTTP_400_BAD_REQUEST)
