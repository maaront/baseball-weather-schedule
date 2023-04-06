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

// Get the data you want to use in the URL from session storage
const data = sessionStorage.getItem("team-abbreviation");

// Generate the URL for the new webpage
const url = `https://maaront.github.io/baseball-weather-schedule/?data=${encodeURIComponent(data)}`;

// Create a new HTML file
const html = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>New Page</title>
    </head>
    <body>
      <h1>New Page</h1>
      <p>Data from session storage: ${data}</p>
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
