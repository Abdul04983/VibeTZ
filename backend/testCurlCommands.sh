# Test earnings endpoint
curl -X GET http://localhost:5000/api/earnings -H "Authorization: Bearer <YOUR_JWT_TOKEN>"

# Test payout endpoint
curl -X GET http://localhost:5000/api/payout -H "Authorization: Bearer <YOUR_JWT_TOKEN>"

# Test dashboard endpoint
curl -X GET http://localhost:5000/api/dashboard -H "Authorization: Bearer <YOUR_JWT_TOKEN>"
