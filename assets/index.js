// const scheduleURL = "https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=2023-03-01&endDate=2023-12-29";
// const apiKey = "AIzaSyDlAGwmtyyL0LvNpxgoBbkgVJfElCJaz2g";



// Get all the elements with the class name you want to listen for clicks on
const teamEls = document.querySelectorAll(".team-logo");

// Loop through each element and add a click event listener
teamEls.forEach(element => {
  element.addEventListener("click", () => {
    // Get the ID (which is the team abbreviation) of the clicked element
    const id = element.id;

    // Save the ID to session storage
    sessionStorage.setItem("team-abbreviation", id);

// Get the ID from session storage
const data = sessionStorage.getItem("team-abbreviation");

// // Generate the URL for the new webpage
// const url = `https://maaront.github.io/baseball-weather-schedule/?data=${encodeURIComponent(data)}`;

// Create a new HTML file
const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Baseball Weather</title>
  <link rel="stylesheet" href="style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.9.3/css/bulma.min.css">
</head>
<body>
  <h1>Baseball Weather</h1>
  <div class="team-info">
    <img class="team-logo" alt="Team Logo">
    <h2 id="team-name"></h2>
  </div>
  <ul id="games-list"></ul>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script src="team-script.js"></script>
  <div id="weather-modal" class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="box">
        <h2 class="title is-4" id="weather-title">Weather Information</h2>
        <p id="weather-description"></p>
        <p id="weather-temperature"></p>
        <p id="weather-wind-speed"></p>
        <p id="weather-humidity"></p>
        <p id="weather-rain-chance"></p>
      </div>
    </div>
    <button class="modal-close is-large" aria-label="close"></button>
  </div>
</body>
</html>
`;

// Create a Blob object from the HTML string
const blob = new Blob([html], { type: "text/html" });

// Create a URL object from the Blob object
const urlObject = URL.createObjectURL(blob);

// Navigate to the new webpage using the generated URL
window.location.href = urlObject;


});
});


// Construct the logo URL using the team ID
// const logoURL = `https://a.espncdn.com/i/teamlogos/mlb/500/${teamData.abbreviation}.png`;


