# Test MPESA Payment Endpoint
curl -X POST http://localhost:5000/api/mpesa -H "Authorization: Bearer <YOUR_JWT_TOKEN>" -H "Content-Type: application/json" -d '{"amount":1000, "phone":"2557xxxxxxx"}'

# Test Airtel Payment Endpoint
curl -X POST http://localhost:5000/api/airtel -H "Authorization: Bearer <YOUR_JWT_TOKEN>" -H "Content-Type: application/json" -d '{"amount":1000, "phone":"2557xxxxxxx"}'

# Test PayPal Payment Endpoint
curl -X POST http://localhost:5000/api/paypal -H "Authorization: Bearer <YOUR_JWT_TOKEN>" -H "Content-Type: application/json" -d '{"amount":50, "paypalEmail":"user@example.com"}'
