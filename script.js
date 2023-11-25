document.addEventListener("DOMContentLoaded", function () {
  let previewEnabled = false;
  const backgroundOverlay = document.getElementById("background-overlay");

  fetch("/data.json")
    .then((response) => response.json())
    .then((data) => {
      const gridContainer = document.getElementById("grid-container");
      data.forEach((item) => {
        const div = document.createElement("div");
        div.className = "grid-item";
        div.innerHTML = `<img src="./textures/${item.image}" alt="${item.name}"><p>${item.name}</p>`;
        gridContainer.appendChild(div);

        div.addEventListener("click", function () {
          backgroundOverlay.style.backgroundImage = `url('./textures/${item.image}')`;
          backgroundOverlay.style.backgroundRepeat = "repeat";
        });
      });
    });

  const previewToggle = document.getElementById("preview-toggle");
  previewToggle.addEventListener("click", function () {
    previewEnabled = !previewEnabled;
    // Toggle the z-index of the background overlay
    backgroundOverlay.style.zIndex = previewEnabled ? "99995" : "-1";
  });
});
