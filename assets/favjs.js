const teams = [
  { name: "Arizona Diamondbacks", abbreviation: "ARI" },
  { name: "Atlanta Braves", abbreviation: "ATL" },
  { name: "Baltimore Orioles", abbreviation: "BAL" },
  { name: "Boston Red Sox", abbreviation: "BOS" },
  { name: "Chicago Cubs", abbreviation: "CHC" },
  { name: "Chicago White Sox", abbreviation: "CWS" },
  { name: "Cincinnati Reds", abbreviation: "CIN" },
  { name: "Cleveland Indians", abbreviation: "CLE" },
  { name: "Colorado Rockies", abbreviation: "COL" },
  { name: "Detroit Tigers", abbreviation: "DET" },
  { name: "Houston Astros", abbreviation: "HOU" },
  { name: "Kansas City Royals", abbreviation: "KC" },
  { name: "Los Angeles Angels", abbreviation: "LAA" },
  { name: "Los Angeles Dodgers", abbreviation: "LAD" },
  { name: "Miami Marlins", abbreviation: "MIA" },
  { name: "Milwaukee Brewers", abbreviation: "MIL" },
  { name: "Minnesota Twins", abbreviation: "MIN" },
  { name: "New York Mets", abbreviation: "NYM" },
  { name: "New York Yankees", abbreviation: "NYY" },
  { name: "Oakland Athletics", abbreviation: "OAK" },
  { name: "Philadelphia Phillies", abbreviation: "PHI" },
  { name: "Pittsburgh Pirates", abbreviation: "PIT" },
  { name: "San Diego Padres", abbreviation: "SD" },
  { name: "San Francisco Giants", abbreviation: "SF" },
  { name: "Seattle Mariners", abbreviation: "SEA" },
  { name: "St. Louis Cardinals", abbreviation: "STL" },
  { name: "Tampa Bay Rays", abbreviation: "TB" },
  { name: "Texas Rangers", abbreviation: "TEX" },
  { name: "Toronto Blue Jays", abbreviation: "TOR" },
  { name: "Washington Nationals", abbreviation: "WSH" },
  ];

const favoritesContainer = document.getElementById("favoritesContainer");

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
    teamLink.href = "team.html";
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

  