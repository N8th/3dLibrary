document.addEventListener("DOMContentLoaded", function () {
  let previewEnabled = false;
  const backgroundOverlay = document.getElementById("background-overlay");

  // Fetching data and populating the grid
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      const gridContainer = document.getElementById("grid-container");
      data.forEach((item) => {
        const div = document.createElement("div");
        div.className = "grid-item";
        div.innerHTML = `<img src="./textures/${item.image}" alt="${item.name}"><p>${item.name}</p>`;
        gridContainer.appendChild(div);

        // Event listener for clicking on a grid item
        div.addEventListener("click", function () {
          backgroundOverlay.style.backgroundImage = `url('./textures/${item.image}')`;
          backgroundOverlay.style.backgroundRepeat = "repeat";
        });
      });
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      // Handle the error or display a message to the user
    });

  // Event listener for the preview toggle
  const previewToggle = document.getElementById("preview-toggle");
  previewToggle.addEventListener("click", function () {
    previewEnabled = !previewEnabled;

    // Toggle the z-index of the background overlay
    backgroundOverlay.style.zIndex = previewEnabled ? "99995" : "-1";

    // Add or remove the 'previewIsOn' class
    if (previewEnabled) {
      previewToggle.classList.add("previewIsOn");
    } else {
      previewToggle.classList.remove("previewIsOn");
    }
  });
});
