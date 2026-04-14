const featureSection = document.querySelector(".feature-section");
const featureButton = document.querySelector(".feature-button");

if (featureSection && featureButton) {
  featureButton.addEventListener("click", () => {
    const isExpanded = featureSection.classList.toggle("is-expanded");

    featureButton.setAttribute("aria-expanded", String(isExpanded));
    featureButton.textContent = isExpanded
      ? "Shrink Food Miles Summary"
      : "Track Your Favorite Produce's Food Miles";
  });
}
