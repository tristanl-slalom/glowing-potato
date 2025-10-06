# glowing-potato 🥔

A Python full stack application that visualizes global potato crop production data over time and showcases popular potato-based foods from around the world.

## Features

- **Potato Crop Production Chart**: Interactive line chart showing global potato production trends from 2014-2023
- **Popular Potato Foods**: Visual cards displaying the most popular potato-based dishes worldwide, ranked by popularity
- **Responsive Design**: Modern, mobile-friendly interface with smooth animations

## Tech Stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **Visualization**: Chart.js
- **Data**: Based on FAO (Food and Agriculture Organization) statistics

## Installation

1. Clone the repository:
```bash
git clone https://github.com/tristanl-slalom/glowing-potato.git
cd glowing-potato
```

2. Install Python dependencies:
```bash
pip install -r requirements.txt
```

## Running the Application

1. Start the Flask server:
```bash
python app.py
```

2. Open your browser and navigate to:
```
http://localhost:5000
```

The application will display:
- A line chart showing potato production over the years
- A grid of cards showing popular potato-based foods with their popularity scores, origins, and descriptions

## Project Structure

```
glowing-potato/
├── app.py              # Flask backend API
├── requirements.txt    # Python dependencies
├── static/            # Frontend files
│   ├── index.html     # Main HTML page
│   ├── styles.css     # Styling
│   └── app.js         # Frontend JavaScript
└── README.md          # This file
```

## API Endpoints

- `GET /` - Serves the main HTML page
- `GET /api/crop-data` - Returns potato crop production data over time
- `GET /api/popular-foods` - Returns list of popular potato-based foods sorted by popularity

## Data Sources

The crop production data is based on FAOSTAT (Food and Agriculture Organization of the United Nations) global potato production statistics. The popular foods list is curated based on worldwide popularity and consumption patterns.

## License

MIT