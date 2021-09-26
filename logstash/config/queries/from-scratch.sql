SELECT 
    product.id,product.product_name, product.model,
    product.sub_category,product.composition,
    product.uom,product.timestamp,
    brand.brand_name,category.category_name 
FROM products.product 
LEFT JOIN products.brand ON product.brand = brand.id 
LEFT JOIN products.category ON product.category = category.id