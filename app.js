// Replace this with your OpenWeatherMap API key
const apiKey = 'YOUR_API_KEY';

// Function to get weather data based on city input
async function getWeather() {
  const city = document.getElementById('city').value;
  const weatherInfo = document.getElementById('weather-info');
  const errorMessage = document.getElementById('error-message');

  // Clear previous data
  weatherInfo.style.display = 'none';
  errorMessage.style.display = 'none';

  // Check if the input field is empty
  if (!city) {
    errorMessage.innerHTML = 'Please enter a city name.';
    errorMessage.style.display = 'block';
    return;
  }

  // Fetch weather data from OpenWeatherMap API
  const url = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=YOUR_API_KEY&units=metric
`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    // Handle case where city is not found
    if (data.cod === '404') {
      errorMessage.innerHTML = 'City not found. Please try again.';
      errorMessage.style.display = 'block';
    } else {
      const { name, main, weather } = data;

      // Update UI with weather information
      weatherInfo.innerHTML = `
        <p><strong>City:</strong> ${name}</p>
        <p><strong>Temperature:</strong> ${main.temp}°C</p>
        <p><strong>Weather:</strong> ${weather[0].description}</p>
        <p><strong>Humidity:</strong> ${main.humidity}%</p>
      `;
      weatherInfo.style.display = 'block';
    }
  } catch (error) {
    console.error(error);
    errorMessage.innerHTML = 'Error fetching weather data. Please try again later.';
    errorMessage.style.display = 'block';
  }
}

// Add event listener to handle the search button click
document.querySelector('button').addEventListener('click', getWeather);

// Optional: Allow hitting 'Enter' to trigger the weather search
document.getElementById('city').addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    getWeather();
  }
});
