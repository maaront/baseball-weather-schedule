<<<<<<< HEAD:assets/team-script.js
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
=======
const teamData = {};

// Define API endpoint URLs
const scheduleURL = "https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=2023-03-01&endDate=2023-12-29";
const weatherURL = "https://api.openweathermap.org/data/2.5/weather";

// Define API key
const weatherApiKey = 'f9eb7079ff683e087e86d13e52641a67';

// Define DOM elements
const teamLogo = document.querySelector(".team-logo");
const teamName = document.getElementById("team-name");
const gamesList = document.getElementById("games-list");

// Retrieve team data from sessionStorage
const storedTeamId = sessionStorage.getItem("selectedTeamId");

if (storedTeamId) {
  teamData.id = parseInt(storedTeamId);
} else {
  console.error("No team ID found in sessionStorage");
}


// Set teamData properties based on the team ID
if (teamData.id) {
  switch (teamData.id) {
      case 109:
          teamData.name = 'Arizona Diamondbacks';
          teamData.abbreviation = 'ARI';
          break;
      case 144:
          teamData.name = 'Atlanta Braves';
          teamData.abbreviation = 'ATL';
          break;
      case 110:
          teamData.name = 'Baltimore Orioles';
          teamData.abbreviation = 'BAL';
          break;
      case 111:
          teamData.name = 'Boston Red Sox';
          teamData.abbreviation = 'BOS';
          break;
      case 112:
          teamData.name = 'Chicago Cubs';
          teamData.abbreviation = 'CHC';
          break;
      case 145:
          teamData.name = 'Chicago White Sox';
          teamData.abbreviation = 'CWS';
          break;
      case 113:
          teamData.name = 'Cincinnati Reds';
          teamData.abbreviation = 'CIN';
          break;
      case 114:
          teamData.name = 'Cleveland Guardians';
          teamData.abbreviation = 'CLE';
          break;
      case 115:
          teamData.name = 'Colorado Rockies';
          teamData.abbreviation = 'COL';
          break;
      case 116:
          teamData.name = 'Detroit Tigers';
          teamData.abbreviation = 'DET';
          break;
      case 117:
          teamData.name = 'Houston Astros';
          teamData.abbreviation = 'HOU';
          break;
      case 118:
          teamData.name = 'Kansas City Royals';
          teamData.abbreviation = 'KC';
          break;
      case 108:
          teamData.name = 'Los Angeles Angels';
          teamData.abbreviation = 'LAA';
          break;
      case 119:
          teamData.name = 'Los Angeles Dodgers';
          teamData.abbreviation = 'LAD';
          break;
      case 146:
          teamData.name = 'Miami Marlins';
          teamData.abbreviation = 'MIA';
          break;
      case 158:
          teamData.name = 'Milwaukee Brewers';
          teamData.abbreviation = 'MIL';
          break;
      case 142:
          teamData.name = 'Minnesota Twins';
          teamData.abbreviation = 'MIN';
          break;
      case 121:
          teamData.name = 'New York Mets';
          teamData.abbreviation = 'NYM';
          break;
      case 147:
          teamData.name = 'New York Yankees';
          teamData.abbreviation = 'NYY';
          break;
      case 133:
          teamData.name = 'Oakland Athletics';
          teamData.abbreviation = 'OAK';
          break;
      case 143:
          teamData.name = 'Philadelphia Phillies';
          teamData.abbreviation = 'PHI';
          break;
      case 134:
          teamData.name = 'Pittsburgh Pirates';
          teamData.abbreviation = 'PIT';
          break;
      case 135:
          teamData.name = 'San Diego Padres';
          teamData.abbreviation = 'SD';
          break;
      case 137:
          teamData.name = 'San Francisco Giants';
          teamData.abbreviation = 'SF';
          break;
      case 136:
          teamData.name = 'Seattle Mariners';
          teamData.abbreviation = 'SEA';
          break;
      case 138:
          teamData.name = 'St. Louis Cardinals';
          teamData.abbreviation = 'STL';
          break;
      case 139:
          teamData.name = 'Tampa Bay Rays';
          teamData.abbreviation = 'TB';
          break;
      case 140:
            teamData.name = 'Texas Rangers';
            teamData.abbreviation = 'TEX';
            break;
      case 141:
            teamData.name = 'Toronto Blue Jays';
            teamData.abbreviation = 'TOR';
            break;
      case 120:
            teamData.name = 'Washington Nationals';
            teamData.abbreviation = 'WSH';
            break;
      default:
            console.error('Invalid team ID');
    }
      
  };
  if (teamData.id && teamData.abbreviation) {
    // Construct the logo URL using the team ID
    const logoURL = `https://a.espncdn.com/i/teamlogos/mlb/500/${teamData.abbreviation}.png`;
  
    // Update team logo and name
    teamLogo.src = logoURL;
    teamName.textContent = teamData.name;
  } else {
    console.error("Invalid team ID or abbreviation not found");
    teamData.abbreviation = "default";
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
>>>>>>> 5b9e3d3141db2b4e724c744817ca72c360e2a318:team-script.js
  