document.addEventListener("DOMContentLoaded", function () {
  let previewEnabled = false;
  const backgroundOverlay = document.getElementById("background-overlay");
  const opacitySlider = document.getElementById("opacity-slider");
  const opacityValue = document.getElementById("opacity-value");
  const backgroundSizeSlider = document.getElementById(
    "background-size-slider"
  );
  const backgroundSizeValue = document.getElementById("background-size-value");

  // Function to increase or decrease slider values by one step
  function changeSliderValue(slider, step, increase) {
    const currentValue = parseFloat(slider.value);
    const newValue = increase ? currentValue + step : currentValue - step;
    slider.value = newValue.toFixed(2); // Limit decimal places to 2
    slider.dispatchEvent(new Event("input")); // Trigger input event to update the value
  }

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

  // Event listener for the opacity slider
  opacitySlider.addEventListener("input", function () {
    const opacity = opacitySlider.value;
    // Update the background opacity of the body element
    document.body.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
    // Display the current opacity value to the user
    opacityValue.textContent = opacity;
  });

  // Event listeners for increasing/decreasing opacity
  const opacityIncreaseButton = document.getElementById("opacity-increase");
  const opacityDecreaseButton = document.getElementById("opacity-decrease");
  const opacityStep = 0.01;

  opacityIncreaseButton.addEventListener("click", function () {
    changeSliderValue(opacitySlider, opacityStep, true);
  });

  opacityDecreaseButton.addEventListener("click", function () {
    changeSliderValue(opacitySlider, opacityStep, false);
  });

  // Event listener for the background size slider
  backgroundSizeSlider.addEventListener("input", function () {
    const backgroundSize = `${backgroundSizeSlider.value}%`;
    // Update the background size property of the background overlay
    backgroundOverlay.style.backgroundSize = backgroundSize;
    // Display the current background size value to the user
    backgroundSizeValue.textContent = backgroundSize;
  });

  // Event listeners for increasing/decreasing background size
  const backgroundSizeIncreaseButton = document.getElementById(
    "background-size-increase"
  );
  const backgroundSizeDecreaseButton = document.getElementById(
    "background-size-decrease"
  );
  const backgroundSizeStep = 1;

  backgroundSizeIncreaseButton.addEventListener("click", function () {
    changeSliderValue(backgroundSizeSlider, backgroundSizeStep, true);
  });

  backgroundSizeDecreaseButton.addEventListener("click", function () {
    changeSliderValue(backgroundSizeSlider, backgroundSizeStep, false);
  });
});
