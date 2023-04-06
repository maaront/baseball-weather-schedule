// const scheduleURL = "https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=2023-03-01&endDate=2023-12-29";
// const apiKey = "AIzaSyDlAGwmtyyL0LvNpxgoBbkgVJfElCJaz2g";



// Get all the elements with the class name you want to listen for clicks on
const teamEls = document.querySelectorAll(".team-logo");

// Loop through each element and add a click event listener
teamEls.forEach(element => {
  element.addEventListener("click", () => {
    // Get the ID (which is the team abbreviation) of the clicked element
    const number = element.dataset.number;
    const abbreviation = element.id;
    // Save the ID to session storage
    sessionStorage.setItem("team-id", number);
    sessionStorage.setItem("team-abbreviation", abbreviation);

// Get the ID from session storage
const data = sessionStorage.getItem("team-id");

window.location.href = "./team.html?id=" + data;

});
});

// // Generate the URL for the new webpage
// const url = `https://maaront.github.io/baseball-weather-schedule/?data=${encodeURIComponent(data)}`;

// // Create a new HTML file
// const html = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <title>Baseball Weather</title>
//   <link rel="stylesheet" href="/assets/style.css">
// </head>
// <body>
//   <h1>Baseball Weather ${data}</h1>
// </body>
// </html>
// `;

// // Create a Blob object from the HTML string
// const blob = new Blob([html], { type: "text/html" });

// // Create a URL object from the Blob object
// const urlObject = URL.createObjectURL(blob);

// // Navigate to the new webpage using the generated URL
// window.location.href = urlObject;





// Construct the logo URL using the team ID
// const logoURL = `https://a.espncdn.com/i/teamlogos/mlb/500/${teamData.abbreviation}.png`;


