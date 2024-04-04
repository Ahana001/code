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