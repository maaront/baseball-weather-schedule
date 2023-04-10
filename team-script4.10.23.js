// Define API endpoint URLs
const scheduleURL = "https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=2023-03-01&endDate=2023-12-29";
const weatherURL = "https://api.openweathermap.org/data/2.5/onecall";

// Define API keys
const weatherApiKey = 'f9eb7079ff683e087e86d13e52641a67';

// Define DOM elements
const teamLogo = document.querySelector(".team-logo");
const teamName = document.getElementById("team-name");
const gamesList = document.getElementById("games-list");

// Retrieve team data from sessionStorage
const teamData = JSON.parse(sessionStorage.getItem('selectedTeam')) || {
    id: 114, // Cleveland Guardians' team ID
    name: 'Cleveland Guardians',
    abbreviation: 'CLE',
  };

// Construct the logo URL using the team ID
const logoURL = `https://a.espncdn.com/i/teamlogos/mlb/500/${teamData.abbreviation}.png`;

// Update team logo and name
teamLogo.src = logoURL;
teamName.textContent = teamData.name;

// Define function to get latitude and longitude using Google Maps Geocoding API
async function getLatLng(location) {
  return new Promise((resolve, reject) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: location }, (results, status) => {
      if (status === "OK") {
        const latLng = results[0].geometry.location;
        resolve({ lat: latLng.lat(), lng: latLng.lng() });
      } else {
        reject(new Error("Geocode failed: " + status));
      }
    });
  });
}

// Define function to get the MLB schedule for a given team
async function getSchedule(teamId) {
  try {
    const response = await axios.get(scheduleURL);
    const today = new Date();
    const games = response.data.dates.flatMap(date => date.games.filter(game => {
      const gameDate = new Date(game.gameDate);
      return (game.teams.away.team.id === teamId || game.teams.home.team.id === teamId) && gameDate >= today;
    })).slice(0, 10);

    // Clear the previous games list
    gamesList.innerHTML = "";

    // Loop through the games and create list items for each game
    for (const game of games) {
      const listItem = document.createElement("li");
      const gameInfo = document.createElement("div");
      const homeTeam = game.teams.home.team;
      const awayTeam = game.teams.away.team;
      const gameDate = new Date(game.gameDate).toLocaleDateString("en-US", { month: 'numeric', day: 'numeric' });
      const vsOrAt = game.teams.home.team.id === teamId ? "vs" : "at";

      gameInfo.innerHTML = `${gameDate} ${vsOrAt} ${vsOrAt === "vs" ? awayTeam.name : homeTeam.name}`;
      listItem.appendChild(gameInfo);

      // Fetch latitude and longitude using Google Maps Geocoding API
      if (game.venue && game.venue.location && game.venue.location.city && game.venue.location.state) {
        const gameLocation = game.venue.location.city + ", " + game.venue.location.state;
        try {
          const latLng = await getLatLng(gameLocation);
          game.venue.location.latitude = latLng.lat;
          game.venue.location.longitude = latLng.lng;
        } catch (error) {
          console.error(`Failed to get latitude and longitude for ${gameLocation}: ${error.message}`);
        }
      } else {
        console.warn('Game venue location is not defined.');
      }

      if (game.venue.location && game.venue.location.latitude && game.venue.location.longitude) {
        listItem.addEventListener("click", async () => {
          try {
            const latitude = game.venue.location.latitude;
            const longitude = game.venue.location.longitude;
            const weatherResponse = await axios.get(weatherURL, {
              params: {
                lat: latitude,
                lon: longitude,
                appid: weatherApiKey,
                units: 'imperial',
                exclude: 'current,minutely,hourly,alerts'
              },
            });
        
            const weatherData = weatherResponse.data.daily;
            const gameTimestamp = new Date(game.gameDate).getTime() / 1000;
        
            // Find the closest weather forecast to the game date
            const closestForecast = weatherData.reduce((prev, curr) => {
              return (Math.abs(curr.dt - gameTimestamp) < Math.abs(prev.dt - gameTimestamp) ? curr : prev);
            });
        
            const weatherDesc = closestForecast.weather[0].description;
            const tempHigh = closestForecast.temp.max;
            const tempLow = closestForecast.temp.min;
            const windSpeed = closestForecast.wind_speed;
            const humidity = closestForecast.humidity;
            const rainChance = closestForecast.pop * 100; // pop is the probability of precipitation (0-1)
        
            // Call the updateWeatherInfo function and pass the weather information as arguments
            updateWeatherInfo(weatherDesc, tempLow, tempHigh, windSpeed, humidity, rainChance);
        
            const weatherModal = document.getElementById("weather-modal");
            weatherModal.classList.add("is-active");
        
            const closeModalButton = weatherModal.querySelector(".modal-close");
            closeModalButton.addEventListener("click", () => {
              weatherModal.classList.remove("is-active");
            });
          } catch (error) {
            console.error(error);
          }
        });
        } else {
          listItem.style.cursor = "default";
          const noWeatherInfo = document.createElement("p");
          noWeatherInfo.textContent = "Weather information not available.";
          listItem.appendChild(noWeatherInfo);
        }

      gamesList.appendChild(listItem);
    }
  } catch (error) {
    console.error(error);
  }
}

function updateWeatherInfo(weatherDesc, tempLow, tempHigh, windSpeed, humidity, rainChance) {
  const weatherDescriptionElement = document.getElementById("weather-description");
  const weatherTemperatureElement = document.getElementById("weather-temperature");
  const weatherWindSpeedElement = document.getElementById("weather-wind-speed");
  const weatherHumidityElement = document.getElementById("weather-humidity");
  const weatherRainChanceElement = document.getElementById("weather-rain-chance");

  weatherDescriptionElement.textContent = `Weather: ${weatherDesc}`;
  weatherTemperatureElement.textContent = `Temperature: ${tempLow}°F - ${tempHigh}°F`;
  weatherWindSpeedElement.textContent = `Wind Speed: ${windSpeed} mph`;
  weatherHumidityElement.textContent = `Humidity: ${humidity}%`;
  weatherRainChanceElement.textContent = `Chance of Rain: ${rainChance}%`;
}

// Load Google Maps JavaScript API
function loadGoogleMapsAPI() {
  const script = document.createElement("script");
  script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDlAGwmtyyL0LvNpxgoBbkgVJfElCJaz2g&callback=initApp`;
  script.async = true;
  script.defer = true;
  document.body.appendChild(script);
}

function initApp() {
  getSchedule(teamData.id);
}
