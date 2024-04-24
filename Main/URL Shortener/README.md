# URL Shortener

A service maintains a database with three string columns:

```
Column Name    Description
user_id        The user id of the user who created the URL
short_url      The shortened URL
actual_url     The actual URL to redirect to
```

There are m users with ids from 0 to m - 1 and q requests for the short URLs. For each request i, report the actual URL and the number of requests processed for the user who created the short URL till the i-th request.

Given an array of n strings, database, where the ith row is represented by the string database[i] in the format " <user_id> <short_url> <actual_url>", and q queries represented by the array of string, queries, for each requested short URL, report an array of strings of length 2 with the actual URL and the number of times a request is made using a short URL created by a particular user.

Example
Suppose there are m = 3 users, database = ["0 sdsf www.google.com", "1 juytf www.google.com", "O opoit www.kaggle.com"], and requests = ["juytf", "sdsf", "opoit"].

Input Format For Custom Testing
The first line contains an integer, m, the number of users.
The next line contains an integer, n, the number of rows in database.
Each of the next n lines contains a string database[i].
The next line contains an integer, q, the number of requests.
Each of the next m lines contains a string requests[i].

Sample Case 0
Sample Input For Custom Testing

n = 4
m = 3

database = ["0 glggl www.google.com", "0 fcbok www.facebook.com", "2 lefts www.hackerrank.com", "0 hckrk www.hackerrank.com"]

q=2
requests = ["hckrk", "lefts"]

Sample Output
www.hackerrank.com 1
www.hackerrank.com 1
