// Define API endpoint URLs
const scheduleURL = "https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=2023-03-01&endDate=2023-12-29";
const weatherURL = "https://api.openweathermap.org/data/2.5/weather";

// Define API key
const apiKey = "AIzaSyDlAGwmtyyL0LvNpxgoBbkgVJfElCJaz2g";
const weatherApiKey = 'f9eb7079ff683e087e86d13e52641a67';

// Define DOM elements
const teamLogo = document.querySelector(".team-logo");
const teamName = document.getElementById("team-name");
const gamesList = document.getElementById("games-list");


// Get the ID from session storage
const teamData = sessionStorage.getItem("team-id");
const teamAbbreviation = sessionStorage.getItem("team-abbreviation");

console.log(teamData);
console.log(teamAbbreviation);

// Retrieve team data from sessionStorage
// const teamData = JSON.parse(sessionStorage.getItem('selectedTeam')) || {
//     id: 114, // Cleveland Guardians' team ID
//     name: 'Cleveland Guardians',
//     abbreviation: 'CLE',
//   };

// Construct the logo URL using the team ID
const logoURL = `https://a.espncdn.com/i/teamlogos/mlb/500/${teamAbbreviation}.png`;

// Update team logo and name
teamLogo.src = logoURL;
teamName.textContent = teamData.name;

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
  
        // Add event listeners to display weather when the game is clicked
        listItem.addEventListener("click", async () => {
          try {
            const city = game.venue.city || "Unknown";
            const country = game.venue.country || "Unknown";
  
            const weatherResponse = await axios.get(weatherURL, {
              params: {
                q: `${city},${country}`,
                appid: weatherApiKey,
                units: 'imperial',
              },
            });
  
            const weatherData = weatherResponse.data;
            const weatherDesc = weatherData.weather[0].description;
            const tempHigh = weatherData.main.temp_max;
            const tempLow = weatherData.main.temp_min;
            const windSpeed = weatherData.wind.speed;
            const humidity = weatherData.main.humidity;
            // Note: OpenWeather API doesn't provide rain chance directly, so we use rain volume for the next 3 hours as a proxy
            const rainChance = weatherData.rain && weatherData.rain['3h'] ? weatherData.rain['3h'] : 0;
  
            document.getElementById("weather-description").textContent = `Weather: ${weatherDesc}`;
            document.getElementById("weather-temperature").textContent = `Temperature: ${tempLow}°F - ${tempHigh}°F`;
            document.getElementById("weather-wind-speed").textContent = `Wind Speed: ${windSpeed} mph`;
            document.getElementById("weather-humidity").textContent = `Humidity: ${humidity}%`;
            document.getElementById("weather-rain-chance").textContent = `Chance of Rain: ${rainChance}%`;
  
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
  
        gamesList.appendChild(listItem);
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  getSchedule(teamData.id);