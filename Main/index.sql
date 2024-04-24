SELECT 
    COUNT(orders.id) AS total_orders,
    SUM(orders.total_amount) AS total_amount,
    COUNT(DISTINCT orders.coupon_id) AS total_unique_coupon_uses,
    ROUND(SUM(coupon.discount_percentage / 100 * orders.total_amount), 2) AS total_savings,
    ROUND(AVG(coupon.discount_percentage / 100 * orders.total_amount), 2) AS avg_saving_per_order
FROM 
    orders
JOIN 
    coupon ON orders.coupon_id = coupon.id
WHERE 
    orders.coupon_id IS NOT NULL;


-- Product table has id title
-- Stocks has Product id and quantity return table has product id and date
-- Need data of July month total stock and total returns
-- Return table display return product and stock table display incoming stock

SELECT 
    SUM(s.quantity) AS total_stock,
    COUNT(DISTINCT r.product_id) AS total_returns
FROM 
    Stocks s
LEFT JOIN 
    ReturnTable r ON s.product_id = r.product_id
WHERE 
    MONTH(s.date) = 7
    AND YEAR(s.date) = YEAR(CURRENT_DATE)
    AND MONTH(r.date) = 7
    AND YEAR(r.date) = YEAR(CURRENT_DATE);
