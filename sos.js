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

const marketGame = document.querySelector("[data-market-game]");

if (marketGame) {
  const gameItems = Array.from(marketGame.querySelectorAll("[data-game-item]"));
  const grade = marketGame.querySelector("[data-game-grade]");
  const message = marketGame.querySelector("[data-game-message]");
  const count = marketGame.querySelector("[data-game-count]");
  const meter = marketGame.querySelector("[data-game-meter]");
  const reset = marketGame.querySelector("[data-game-reset]");
  const note = marketGame.querySelector("[data-game-note]");

  const getLetterGrade = (percent) => {
    if (percent >= 90) return "A";
    if (percent >= 80) return "B";
    if (percent >= 70) return "C";
    if (percent >= 60) return "D";
    return "F";
  };

  const getScoreMessage = (answered, percent) => {
    if (answered === 0) {
      return "Choose at least one item to start.";
    }

    if (percent >= 70) {
      return "Passing grade. Your basket leans local and keeps more food miles off the table.";
    }

    if (percent >= 40) {
      return "Close call. Shift a few everyday foods toward the farmers market to raise your score.";
    }

    return "Failing grade. Most of this basket still depends on longer grocery-store supply chains.";
  };

  const updateMarketScore = () => {
    const answers = gameItems
      .map((item) => item.querySelector(".is-selected"))
      .filter(Boolean);
    const answered = answers.length;
    const totalScore = answers.reduce(
      (sum, answer) => sum + Number(answer.dataset.score),
      0,
    );
    const percent = answered === 0 ? 0 : Math.round((totalScore / answered) * 100);

    grade.textContent = answered === 0 ? "--" : getLetterGrade(percent);
    message.textContent = getScoreMessage(answered, percent);
    count.textContent = `${answered} of ${gameItems.length} answered`;
    meter.style.width = `${percent}%`;

    if (note) {
      note.hidden = answered !== gameItems.length;
    }
  };

  gameItems.forEach((item) => {
    const buttons = Array.from(item.querySelectorAll("[data-score]"));

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((option) => {
          option.classList.remove("is-selected");
          option.setAttribute("aria-pressed", "false");
        });

        button.classList.add("is-selected");
        button.setAttribute("aria-pressed", "true");
        updateMarketScore();
      });

      button.setAttribute("aria-pressed", "false");
    });
  });

  reset.addEventListener("click", () => {
    marketGame.querySelectorAll(".is-selected").forEach((button) => {
      button.classList.remove("is-selected");
      button.setAttribute("aria-pressed", "false");
    });

    updateMarketScore();
  });

  updateMarketScore();
}
