// const scheduleURL = "https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=2023-03-01&endDate=2023-12-29";
// const weatherURL = "https://api.openweathermap.org/data/2.5/weather";
// const weatherApiKey = 'f9eb7079ff683e087e86d13e52641a67';
    // const logoURL = `https://a.espncdn.com/i/teamlogos/mlb/500/${teamData.abbreviation}.png`;
    const teams = [
      { name: "Arizona Diamondbacks", abbreviation: "ARI", id: 109 },
      { name: "Atlanta Braves", abbreviation: "ATL", id: 144 },
      { name: "Baltimore Orioles", abbreviation: "BAL", id: 110 },
      { name: "Boston Red Sox", abbreviation: "BOS", id: 111 },
      { name: "Chicago White Sox", abbreviation: "CWS", id: 145 },
      { name: "Chicago Cubs", abbreviation: "CHC", id: 112 },
      { name: "Cincinnati Reds", abbreviation: "CIN", id: 113 },
      { name: "Cleveland Guardians", abbreviation: "CLE", id: 114 },
      { name: "Colorado Rockies", abbreviation: "COL", id: 115 },
      { name: "Detroit Tigers", abbreviation: "DET", id: 116 },
      { name: "Houston Astros", abbreviation: "HOU", id: 117 },
      { name: "Kansas City Royals", abbreviation: "KC", id: 118 },
      { name: "Los Angeles Angels", abbreviation: "LAA", id: 108 },
      { name: "Los Angeles Dodgers", abbreviation: "LAD", id: 119 },
      { name: "Miami Marlins", abbreviation: "MIA", id: 146 },
      { name: "Milwaukee Brewers", abbreviation: "MIL", id: 158 },
      { name: "Minnesota Twins", abbreviation: "MIN", id: 142 },
      { name: "New York Yankees", abbreviation: "NYY", id: 147 },
      { name: "New York Mets", abbreviation: "NYM", id: 121 },
      { name: "Oakland Athletics", abbreviation: "OAK", id: 133 },
      { name: "Philadelphia Phillies", abbreviation: "PHI", id: 143 },
      { name: "Pittsburgh Pirates", abbreviation: "PIT", id: 134 },
      { name: "San Diego Padres", abbreviation: "SD", id: 135 },
      { name: "San Francisco Giants", abbreviation: "SF", id: 137 },
      { name: "Seattle Mariners", abbreviation: "SEA", id: 136 },
      { name: "St. Louis Cardinals", abbreviation: "STL", id: 138 },
      { name: "Tampa Bay Rays", abbreviation: "TB", id: 139 },
      { name: "Texas Rangers", abbreviation: "TEX", id: 140 },
      { name: "Toronto Blue Jays", abbreviation: "TOR", id: 141 },
      { name: "Washington Nationals", abbreviation: "WSH", id: 120 }
    ];

    function displayTeamInfo(team) {
      const teamLogo = document.getElementById("team-logo");
      const teamName = document.getElementById("team-name");
    
      teamLogo.src = `https://a.espncdn.com/i/teamlogos/mlb/500/${team.abbreviation}.png`;
      teamLogo.alt = `${team.name} Logo`;
      teamName.textContent = team.name;
    }
    
    async function fetchTeamSchedule(teamId) {
      const response = await axios.get(`https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=2023-03-01&endDate=2023-12-29&teamId=${teamId}`);
      return response.data.dates;
    }
    
    async function fetchGameWeather(latitude, longitude) {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weatherApiKey}`);
      return response.data.weather[0].description;
    }
    
    async function displayTeamSchedule(schedule) {
      const scheduleElement = document.getElementById("games-list");
    
      for (const date of schedule) {
        for (const game of date.games) {
          const listItem = document.createElement("li");
    
          const gameInfo = document.createElement("div");
          gameInfo.textContent = `${game.teams.away.team.name} @ ${game.teams.home.team.name}`;
    
          const weatherInfo = document.createElement("div");
          weatherInfo.classList.add("weather-info");
    
          // Check if the game has a venue and a location before fetching weather data
          if (game.venue && game.venue.location) {
            try {
              const weather = await fetchGameWeather(game.venue.location.latitude, game.venue.location.longitude);
              weatherInfo.textContent = weather;
            } catch (error) {
              console.error("Error fetching weather data:", error);
            }
          } else {
            weatherInfo.textContent = "Weather information not available";
          }
    
          listItem.appendChild(gameInfo);
          listItem.appendChild(weatherInfo);
    
          scheduleElement.appendChild(listItem);
        }
      }
    }
    
    
    async function main() {
      const urlParams = new URLSearchParams(window.location.search);
      const teamId = urlParams.get("id");
    
      if (teamId) {
        const selectedTeam = teams.find((team) => team.id == teamId);
        if (selectedTeam) {
          displayTeamInfo(selectedTeam);
          try {
            const schedule = await fetchTeamSchedule(selectedTeam.id);
            await displayTeamSchedule(schedule);
          } catch (error) {
            console.error("Error fetching schedule or weather data:", error);
          }
        }
      } else {
        const favoriteTeam = getFavoriteTeam();
        if (favoriteTeam) {
          displayTeamInfo(favoriteTeam);
          try {
            const schedule = await fetchTeamSchedule(favoriteTeam.id);
            await displayTeamSchedule(schedule);
          } catch (error) {
            console.error("Error fetching schedule or weather data:", error);
          }
        } else {
          window.location.href = "index.html";
        }
      }
    }

    main();
  
  
