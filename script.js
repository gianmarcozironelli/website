document.addEventListener('DOMContentLoaded', () => {
    // Initialize the map
    const map = L.map('map').setView([51.5074, -0.1278], 12); // Centered on London

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Coordinates of toilets in London
    const toilets = [
        { lat: 51.5074, lng: -0.1278, name: 'Bagno 1' },
        { lat: 51.5155, lng: -0.1419, name: 'Bagno 2' },
        // Add more coordinates as needed
    ];

    // Add markers to the map
    toilets.forEach(toilet => {
        L.marker([toilet.lat, toilet.lng])
            .addTo(map)
            .bindPopup(`<b>${toilet.name}</b>`);
    });

    // Fetch and display weather data
    fetchWeatherData();
});

function fetchWeatherData() {
    const apiKey = 'c52a1bf149541f9ce570fda19bedac97'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayWeatherData(data);
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
    const weatherDiv = document.getElementById('weather');
    if (!weatherDiv) {
        console.error('Weather div not found');
        return;
    }
    const forecast = data.list.slice(0, 5).map(item => {
        let emoji = '';
        switch(item.weather[0].main) {
            case 'Clear':
                emoji = '☀️';
                break;
            case 'Clouds':
                emoji = '☁️';
                break;
            case 'Rain':
                emoji = '🌧️';
                break;
            case 'Snow':
                emoji = '❄️';
                break;
            // Add more conditions as needed
            default:
                emoji = '🌈';
        }
        return `<p>${new Date(item.dt * 1000).toLocaleString()}: ${emoji} ${item.weather[0].description}, ${item.main.temp}°C</p>`;
    }).join('');
    weatherDiv.innerHTML = forecast;
}