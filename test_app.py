import unittest
import json
from app import app  # Adjust the import based on your file structure

class FlaskAppTests(unittest.TestCase):

    def setUp(self):
        # Create a test client
        self.app = app.test_client()
        self.app.testing = True  # Enable testing mode

    def test_register_endpoint(self):
        # Send a POST request to the endpoint
        data = {
            "password": "password123",
            "email": "testuser@example.com",
            "firstname": "Test",
            "surname": "User",
        }
         
        response = self.app.post('/api/register', 
                                 data=json.dumps(data), 
                                 content_type='application/json')
        # Check the response status code
        print(response.status_code)
    
    def test_login_success(self):
        """Test successful login."""
        response = self.app.post('/api/auth/login', 
                                  data=json.dumps({'email': 'testuser@example.com', 'password': 'password123'}),
                                  content_type='application/json')
        self.assertEqual(response.status_code, 200)
        self.assertIn('access_token', response.get_json())
    
    def test_login_failure_bad_username(self):
        """Test login failure with a bad username."""
        response = self.app.post('/api/auth/login', 
                                  data=json.dumps({'username': 'wronguser', 'password': 'testpassword'}),
                                  content_type='application/json')
        self.assertEqual(response.status_code, 401)
        self.assertEqual(response.get_json(), {"msg": "Bad username or password"})

if __name__ == '__main__':
    unittest.main()
