const featureSection = document.querySelector(".feature-section");
const featureButton = document.querySelector(".feature-button");
const featureGraph = document.querySelector(".feature-graph");

if (featureSection && featureButton && featureGraph) {
  const toggleFeatureGraph = () => {
    const isExpanded = featureSection.classList.toggle("is-expanded");

    featureButton.setAttribute("aria-expanded", String(isExpanded));
    featureGraph.setAttribute("aria-expanded", String(isExpanded));
    featureButton.textContent = isExpanded
      ? "Shrink Food Miles Summary"
      : "Track Your Favorite Produce's Food Miles";
  };

  featureButton.addEventListener("click", toggleFeatureGraph);
  featureGraph.addEventListener("click", toggleFeatureGraph);
  featureGraph.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleFeatureGraph();
    }
  });
}
