const scheduleURL = "https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=2023-03-01&endDate=2023-12-29";
const apiKey = "AIzaSyDlAGwmtyyL0LvNpxgoBbkgVJfElCJaz2g";



// Get all the elements with the class name you want to listen for clicks on
const teamEls = document.querySelectorAll(".team-logo");

// Loop through each element and add a click event listener
teamEls.forEach(element => {
  element.addEventListener("click", () => {
    // Get the ID (which is the team abbreviation) of the clicked element
    const id = element.id;

    // Save the ID to session storage
    sessionStorage.setItem("team-abbreviation", id);

  });
});


// Construct the logo URL using the team ID
const logoURL = `https://a.espncdn.com/i/teamlogos/mlb/500/${teamData.abbreviation}.png`;