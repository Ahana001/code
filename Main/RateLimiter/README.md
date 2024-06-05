# src/middleware.js

- The constructor accepts an options object with the properties maxRequests and timeWindow.
- Initializes an empty Map instance as rateLimitStore to store the client IP addresses and their corresponding request data.

# middleware method should:

- Keep track of the request count and the timestamp of the first request for each client IP address.
- Limit the number of requests based on the provided maxRequests and timeWindow options.
- Clears the rateLimitStore by calling its clear() method, effectively resetting the rate limit data for all clients.

# src/options.js

- Define an object rateLimiterOptions with the properties maxRequests and timeWindow.
