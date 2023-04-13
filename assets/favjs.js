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

const favoritesContainer = document.getElementById("favoritesContainer");

  const logoContainer = document.getElementById("logo-container");

function createTeamElements() {
  const logoContainer = document.getElementById("logo-container");
  
  teams.forEach((team) => {
    const teamElement = document.createElement("section");
    teamElement.classList.add("team");

    const favoriteButton = document.createElement("button");
    favoriteButton.classList.add("favoriteheart");
    favoriteButton.setAttribute("data-team-name", team.name);
    favoriteButton.innerHTML = `<i class="fa fa-heart"></i>`;
    teamElement.appendChild(favoriteButton);

    const teamLink = document.createElement("a");

    teamLink.href = `team.html?id=${team.id}`;

    teamElement.appendChild(teamLink);

    const teamLogo = document.createElement("img");
    teamLogo.classList.add("team-logo");
    teamLogo.alt = `${team.name} Logo`;
    teamLogo.src = `https://a.espncdn.com/i/teamlogos/mlb/500/${team.abbreviation}.png`;
    teamLink.appendChild(teamLogo);

    const teamName = document.createElement("section");
    teamName.classList.add("team-name");
    teamName.textContent = team.name;
    teamElement.appendChild(teamName);

    logoContainer.appendChild(teamElement);
  });
}

function addFavorite(team) {
  // Remove any existing favorite team elements
  while (favoritesContainer.firstChild) {
    favoritesContainer.removeChild(favoritesContainer.firstChild);
  }

  const favoriteTeamElement = document.createElement("div");
  favoriteTeamElement.classList.add("favorite-team");

  const teamLogo = document.createElement("img");
  teamLogo.classList.add("team-logo");
  teamLogo.alt = `${team.name} Logo`;
  teamLogo.src = `https://a.espncdn.com/i/teamlogos/mlb/500/${team.abbreviation}.png`;
  favoriteTeamElement.appendChild(teamLogo);

  const teamName = document.createElement("div");
  teamName.textContent = team.name;
  favoriteTeamElement.appendChild(teamName);

  favoritesContainer.appendChild(favoriteTeamElement);
}

function updateFavoriteButtonListeners() {
  const favoriteButtons = document.querySelectorAll(".favoriteheart");
  favoriteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove the selected class from all favorite buttons
      favoriteButtons.forEach((btn) => btn.classList.remove("selected"));

      const teamName = button.getAttribute("data-team-name");
      const team = teams.find((t) => t.name === teamName);
      localStorage.setItem("favoriteTeam", teamName);
      button.classList.add("selected");
      addFavorite(team);
    });
  });
}

// Show saved favorite team on page load
document.addEventListener("DOMContentLoaded", () => {
  const savedFavoriteTeamName = localStorage.getItem("favoriteTeam");
  if (savedFavoriteTeamName) {
    const savedFavoriteTeam = teams.find(
      (team) => team.name === savedFavoriteTeamName
    );
    if (savedFavoriteTeam) {
      const button = document.querySelector(
        `[data-team-name="${savedFavoriteTeamName}"]`
      );
      button.classList.add("selected");
      addFavorite(savedFavoriteTeam);
    }
  }
});

createTeamElements();
updateFavoriteButtonListeners();

  