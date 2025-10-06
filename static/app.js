// API base URL
const API_BASE_URL = window.location.origin;

// Draw a simple line chart using canvas
function drawLineChart(canvas, data) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set up padding and dimensions
    const padding = 60;
    const chartWidth = width - 2 * padding;
    const chartHeight = height - 2 * padding;
    
    // Extract years and production values
    const years = data.map(d => d.year);
    const production = data.map(d => d.production);
    
    // Find min and max values for scaling
    const minProduction = Math.min(...production) - 10;
    const maxProduction = Math.max(...production) + 10;
    const productionRange = maxProduction - minProduction;
    
    // Function to convert data to canvas coordinates
    const getX = (index) => padding + (index / (years.length - 1)) * chartWidth;
    const getY = (value) => height - padding - ((value - minProduction) / productionRange) * chartHeight;
    
    // Draw grid lines
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 5; i++) {
        const y = padding + (i / 5) * chartHeight;
        ctx.beginPath();
        ctx.moveTo(padding, y);
        ctx.lineTo(width - padding, y);
        ctx.stroke();
        
        // Draw Y-axis labels
        const value = maxProduction - (i / 5) * productionRange;
        ctx.fillStyle = '#666';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'right';
        ctx.fillText(value.toFixed(0), padding - 10, y + 4);
    }
    
    // Draw area fill
    ctx.fillStyle = 'rgba(245, 87, 108, 0.1)';
    ctx.beginPath();
    ctx.moveTo(getX(0), height - padding);
    production.forEach((value, index) => {
        ctx.lineTo(getX(index), getY(value));
    });
    ctx.lineTo(getX(production.length - 1), height - padding);
    ctx.closePath();
    ctx.fill();
    
    // Draw line
    ctx.strokeStyle = '#f5576c';
    ctx.lineWidth = 3;
    ctx.beginPath();
    production.forEach((value, index) => {
        if (index === 0) {
            ctx.moveTo(getX(index), getY(value));
        } else {
            ctx.lineTo(getX(index), getY(value));
        }
    });
    ctx.stroke();
    
    // Draw points
    production.forEach((value, index) => {
        const x = getX(index);
        const y = getY(value);
        
        // Draw point shadow
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.beginPath();
        ctx.arc(x, y + 2, 6, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw point
        ctx.fillStyle = '#f5576c';
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw white border
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(x, y, 5, 0, 2 * Math.PI);
        ctx.stroke();
        
        // Draw X-axis labels
        ctx.fillStyle = '#666';
        ctx.font = '12px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(years[index], x, height - padding + 20);
    });
    
    // Draw axes labels
    ctx.fillStyle = '#333';
    ctx.font = 'bold 14px sans-serif';
    
    // Y-axis label
    ctx.save();
    ctx.translate(20, height / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.textAlign = 'center';
    ctx.fillText('Production (Million Metric Tons)', 0, 0);
    ctx.restore();
    
    // X-axis label
    ctx.textAlign = 'center';
    ctx.fillText('Year', width / 2, height - 10);
    
    // Draw title
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#f5576c';
    ctx.textAlign = 'center';
    ctx.fillText('Global Potato Production', width / 2, 30);
}

// Fetch and display crop data
async function loadCropData() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/crop-data`);
        const result = await response.json();
        
        // Update data source
        document.getElementById('dataSource').textContent = 
            `Data in ${result.unit}. ${result.source}`;
        
        // Get canvas and set size
        const canvas = document.getElementById('cropChart');
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth - 40;
        canvas.height = 380;
        
        // Draw chart
        drawLineChart(canvas, result.data);
        
        // Redraw on window resize
        window.addEventListener('resize', () => {
            canvas.width = container.offsetWidth - 40;
            canvas.height = 380;
            drawLineChart(canvas, result.data);
        });
    } catch (error) {
        console.error('Error loading crop data:', error);
        document.getElementById('dataSource').textContent = 'Error loading crop data';
    }
}

// Fetch and display popular foods
async function loadPopularFoods() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/popular-foods`);
        const result = await response.json();
        
        const foodsGrid = document.getElementById('foodsGrid');
        foodsGrid.innerHTML = '';
        
        result.data.forEach((food, index) => {
            const card = document.createElement('div');
            card.className = 'food-card';
            
            // Add staggered animation
            card.style.animation = `fadeIn 0.5s ease ${index * 0.1}s backwards`;
            
            card.innerHTML = `
                <h3>${food.name}</h3>
                <div class="popularity-score">Popularity: ${food.popularity}/100</div>
                <div class="popularity-bar">
                    <div class="popularity-fill" style="width: ${food.popularity}%"></div>
                </div>
                <div class="food-origin">📍 Origin: ${food.origin}</div>
                <div class="food-description">${food.description}</div>
            `;
            
            foodsGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading popular foods:', error);
        document.getElementById('foodsGrid').innerHTML = 
            '<div class="loading">Error loading food data</div>';
    }
}

// Add fade-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Load data when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadCropData();
    loadPopularFoods();
});
