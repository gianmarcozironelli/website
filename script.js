document.addEventListener('DOMContentLoaded', () => {
    // Display welcome message
    displayWelcomeMessage();

    // Initialize the map
    const map = L.map('map').setView([51.5074, -0.1278], 12); // Centered on London

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Coordinates of toilets in London
    const toilets = [
        { lat: 51.5074, lng: -0.1278, name: 'Charing Cross Station' },
        { lat: 51.5119, lng: -0.1225, name: '2theloo Covent Garden' },
        { lat: 51.5080, lng: -0.1281, name: 'Trafalgar Square Public Toilets' },
        { lat: 51.5033, lng: -0.1195, name: 'Westminster Underground Station' },
        { lat: 51.5107, lng: -0.1340, name: 'Piccadilly Circus Underground Station' },
        { lat: 51.5030, lng: -0.1132, name: 'London Eye Toilets' },
        { lat: 51.5079, lng: -0.0877, name: 'London Bridge Station' },
        { lat: 51.5155, lng: -0.1419, name: 'Oxford Circus Underground Station' },
        { lat: 51.5036, lng: -0.1276, name: 'St James\'s Park Toilets' },
        { lat: 51.5096, lng: -0.0956, name: 'Cannon Street Station' },
        { lat: 51.5070, lng: -0.1246, name: 'Embankment Station' },
        { lat: 51.5152, lng: -0.0722, name: 'Liverpool Street Station' },
        { lat: 51.5034, lng: -0.1195, name: 'Southbank Centre Toilets' },
        { lat: 51.5074, lng: -0.1657, name: 'Hyde Park Corner Toilets' },
        { lat: 51.5094, lng: -0.0760, name: 'Tower Hill Station' },
        { lat: 51.5113, lng: -0.1173, name: 'Leicester Square Underground Station' },
        { lat: 51.5030, lng: -0.1132, name: 'Waterloo Station Toilets' },
        { lat: 51.5150, lng: -0.0921, name: 'Moorgate Station' },
        { lat: 51.5079, lng: -0.0877, name: 'The Shard Toilets' },
        { lat: 51.5096, lng: -0.0956, name: 'Monument Station' },
        { lat: 51.5034, lng: -0.1195, name: 'Royal Festival Hall Toilets' },
        { lat: 51.5074, lng: -0.1278, name: 'National Gallery Toilets' },
        { lat: 51.5155, lng: -0.1419, name: 'Regent Street Toilets' },
        { lat: 51.5033, lng: -0.1195, name: 'Jubilee Gardens Toilets' },
        { lat: 51.5070, lng: -0.1246, name: 'Victoria Embankment Gardens Toilets' },
        { lat: 51.5119, lng: -0.1225, name: 'Covent Garden Market Toilets' },
        { lat: 51.5080, lng: -0.1281, name: 'St Martin-in-the-Fields Toilets' },
        { lat: 51.5030, lng: -0.1132, name: 'County Hall Toilets' },
        { lat: 51.5079, lng: -0.0877, name: 'HMS Belfast Toilets' },
        { lat: 51.5155, lng: -0.1419, name: 'Liberty London Toilets' },
        { lat: 51.5036, lng: -0.1276, name: 'Green Park Toilets' },
        { lat: 51.5096, lng: -0.0956, name: 'Bank Station Toilets' },
        { lat: 51.5070, lng: -0.1246, name: 'Victoria Station Toilets' },
        { lat: 51.5152, lng: -0.0722, name: 'Spitalfields Market Toilets' },
        { lat: 51.5034, lng: -0.1195, name: 'National Theatre Toilets' },
        { lat: 51.5074, lng: -0.1657, name: 'Kensington Gardens Toilets' },
        { lat: 51.5094, lng: -0.0760, name: 'Fenchurch Street Station Toilets' },
        { lat: 51.5113, lng: -0.1173, name: 'Soho Square Toilets' },
        { lat: 51.5030, lng: -0.1132, name: 'Gabriel\'s Wharf Toilets' },
        { lat: 51.5150, lng: -0.0921, name: 'Barbican Centre Toilets' },
        { lat: 51.5079, lng: -0.0877, name: 'Borough Market Toilets' },
        { lat: 51.5096, lng: -0.0956, name: 'St Paul\'s Cathedral Toilets' },
        { lat: 51.5034, lng: -0.1195, name: 'Hayward Gallery Toilets' },
        { lat: 51.5074, lng: -0.1278, name: 'British Museum Toilets' },
        { lat: 51.5155, lng: -0.1419, name: 'Carnaby Street Toilets' },
        { lat: 51.5033, lng: -0.1195, name: 'Oxo Tower Wharf Toilets' },
        { lat: 51.5070, lng: -0.1246, name: 'Horse Guards Parade Toilets' },
        { lat: 51.5119, lng: -0.1225, name: 'Neal\'s Yard Toilets' },
        { lat: 51.5080, lng: -0.1281, name: 'Admiralty Arch Toilets' },
        { lat: 51.5030, lng: -0.1132, name: 'BFI Southbank Toilets' },
        { lat: 51.5079, lng: -0.0877, name: 'Globe Theatre Toilets' },
        { lat: 51.5155, lng: -0.1419, name: 'Hamleys Toilets' },
        { lat: 51.5036, lng: -0.1276, name: 'Buckingham Palace Toilets' },
    // Add more coordinates as needed
];

    // Add markers to the map
    toilets.forEach(toilet => {
        L.marker([toilet.lat, toilet.lng])
            .addTo(map)
            .bindPopup(`<b>${toilet.name}</b>`);
    });

    // Enable device location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;

            // Add user location marker
            L.marker([userLat, userLng], { icon: L.icon({ iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41] }) })
                .addTo(map)
                .bindPopup('<b>Your Location</b>')
                .openPopup();

            // Find the nearest toilet
            let nearestToilet = null;
            let minDistance = Infinity;
            toilets.forEach(toilet => {
                const distance = Math.sqrt(Math.pow(toilet.lat - userLat, 2) + Math.pow(toilet.lng - userLng, 2));
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestToilet = toilet;
                }
            });

            if (nearestToilet) {
                L.marker([nearestToilet.lat, nearestToilet.lng])
                    .addTo(map)
                    .bindPopup(`<b>Nearest Toilet: ${nearestToilet.name}</b>`)
                    .openPopup();
            }

            // Center map on user location
            map.setView([userLat, userLng], 14);
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }

    // Fetch and display weather data
    fetchWeatherData();
});

function displayWelcomeMessage() {
    const welcomeDiv = document.getElementById('welcome-message');
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1; // January is 0
    const hours = today.getHours();
    let timeOfDay = '';

    if (hours < 12) {
        timeOfDay = 'Buongiorno';
    } else if (hours < 18) {
        timeOfDay = 'Buon pomeriggio';
    } else {
        timeOfDay = 'Buonasera';
    }

    let message = '';
    if (day === 13 && month === 2) {
        message = `Oggi è il ${day}/${month}: Manca un giorno a San Valentinoooo 💘`;
    } else if (day === 14 && month === 2) {
        message = `${timeOfDay}, buon San Valentinooooo 💘`;
    } else {
        message = `${timeOfDay}, oggi è il ${day}/${month}`;
    }

    welcomeDiv.innerHTML = `<h2>${message}</h2>`;
}

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