// middleware.js
class RateLimiterMiddleware {
    constructor(options) {
        this.rateLimitStore = new Map();
        this.options = options;
    }

    middleware() {
        return (req, res, next) => {
            const clientIP = req.ip; // Retrieve client's IP address
            const requestData = this.rateLimitStore.get(clientIP) || { requestCount: 0, firstRequestTime: Date.now() };
            const { maxRequests, timeWindow } = this.options;
            const { requestCount, firstRequestTime } = requestData;

            if (requestCount >= maxRequests && (Date.now() - firstRequestTime) < timeWindow) {
                res.setHeader('X-RateLimit-Remaining', 0);
                res.setHeader('X-RateLimit-Limit', maxRequests);
                res.setHeader('X-RateLimit-Reset', firstRequestTime + timeWindow);
                return res.status(429).json({ message: "You have exceeded the rate limit. Please try again later." });
            }

            requestData.requestCount++;
            this.rateLimitStore.set(clientIP, requestData);

            if ((Date.now() - firstRequestTime) >= timeWindow) {
                requestData.requestCount = 1;
                requestData.firstRequestTime = Date.now();
            }

            res.setHeader('X-RateLimit-Limit', maxRequests);
            res.setHeader('X-RateLimit-Remaining', maxRequests - requestData.requestCount); // Update remaining requests
            res.setHeader('X-RateLimit-Reset', requestData.firstRequestTime + timeWindow);

            next();
        };
    }

    reset() {
        this.rateLimitStore.clear();
    }
}

module.exports = RateLimiterMiddleware;
