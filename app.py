"""
Flask backend API for potato crop data and popular foods
"""
from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__, static_folder='static')
CORS(app)

# Mock data for potato crop production over time (in million metric tons)
# Data inspired by FAOSTAT global potato production statistics
POTATO_CROP_DATA = [
    {"year": 2014, "production": 385.0},
    {"year": 2015, "production": 381.0},
    {"year": 2016, "production": 376.0},
    {"year": 2017, "production": 388.0},
    {"year": 2018, "production": 368.0},
    {"year": 2019, "production": 370.0},
    {"year": 2020, "production": 359.0},
    {"year": 2021, "production": 376.0},
    {"year": 2022, "production": 374.0},
    {"year": 2023, "production": 373.0},
]

# Popular potato-based foods worldwide with popularity score (1-100)
POPULAR_POTATO_FOODS = [
    {
        "name": "French Fries",
        "popularity": 98,
        "origin": "Belgium/France",
        "description": "Crispy fried potato strips, popular worldwide"
    },
    {
        "name": "Mashed Potatoes",
        "popularity": 95,
        "origin": "Europe",
        "description": "Creamy boiled and mashed potatoes"
    },
    {
        "name": "Potato Chips",
        "popularity": 97,
        "origin": "USA",
        "description": "Thin sliced and fried potato snacks"
    },
    {
        "name": "Baked Potato",
        "popularity": 90,
        "origin": "United Kingdom",
        "description": "Whole potato baked until fluffy inside"
    },
    {
        "name": "Hash Browns",
        "popularity": 88,
        "origin": "USA",
        "description": "Shredded potatoes pan-fried until crispy"
    },
    {
        "name": "Potato Salad",
        "popularity": 85,
        "origin": "Germany",
        "description": "Cold dish of boiled potatoes with dressing"
    },
    {
        "name": "Gnocchi",
        "popularity": 82,
        "origin": "Italy",
        "description": "Italian potato dumplings"
    },
    {
        "name": "Poutine",
        "popularity": 80,
        "origin": "Canada",
        "description": "Fries with cheese curds and gravy"
    },
    {
        "name": "Potato Wedges",
        "popularity": 87,
        "origin": "USA",
        "description": "Thick-cut seasoned baked or fried potatoes"
    },
    {
        "name": "Roasted Potatoes",
        "popularity": 91,
        "origin": "Europe",
        "description": "Oven-roasted seasoned potato chunks"
    },
]

@app.route('/')
def index():
    """Serve the main HTML page"""
    return send_from_directory('static', 'index.html')

@app.route('/<path:filename>')
def serve_static(filename):
    """Serve static files"""
    return send_from_directory('static', filename)

@app.route('/api/crop-data')
def get_crop_data():
    """Get potato crop production data over time"""
    return jsonify({
        "data": POTATO_CROP_DATA,
        "unit": "million metric tons",
        "source": "Based on FAO statistics"
    })

@app.route('/api/popular-foods')
def get_popular_foods():
    """Get list of popular potato-based foods sorted by popularity"""
    sorted_foods = sorted(POPULAR_POTATO_FOODS, key=lambda x: x['popularity'], reverse=True)
    return jsonify({
        "data": sorted_foods,
        "count": len(sorted_foods)
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
