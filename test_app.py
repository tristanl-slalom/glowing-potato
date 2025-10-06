"""
Simple tests for the potato data API
"""
import unittest
import json
from app import app

class TestPotatoAPI(unittest.TestCase):
    def setUp(self):
        """Set up test client"""
        self.app = app.test_client()
        self.app.testing = True

    def test_crop_data_endpoint(self):
        """Test that crop data endpoint returns correct structure"""
        response = self.app.get('/api/crop-data')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertIn('data', data)
        self.assertIn('unit', data)
        self.assertIn('source', data)
        
        # Check we have data for multiple years
        self.assertGreater(len(data['data']), 0)
        
        # Check data structure
        first_item = data['data'][0]
        self.assertIn('year', first_item)
        self.assertIn('production', first_item)

    def test_popular_foods_endpoint(self):
        """Test that popular foods endpoint returns correct structure"""
        response = self.app.get('/api/popular-foods')
        self.assertEqual(response.status_code, 200)
        
        data = json.loads(response.data)
        self.assertIn('data', data)
        self.assertIn('count', data)
        
        # Check we have multiple foods
        self.assertGreater(data['count'], 0)
        
        # Check data structure
        first_food = data['data'][0]
        self.assertIn('name', first_food)
        self.assertIn('popularity', first_food)
        self.assertIn('origin', first_food)
        self.assertIn('description', first_food)
        
        # Check foods are sorted by popularity (descending)
        popularities = [food['popularity'] for food in data['data']]
        self.assertEqual(popularities, sorted(popularities, reverse=True))

    def test_index_endpoint(self):
        """Test that index endpoint serves HTML"""
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Potato Data Dashboard', response.data)

if __name__ == '__main__':
    unittest.main()
