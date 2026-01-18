const RecipeApp = (function () {
  // Private data
  let recipes = [
    {
      name: "Pancakes",
      category: "Breakfast",
      time: 15,
      ingredients: ["Flour", "Milk", "Eggs"],
      steps: [
        "Mix ingredients",
        [
          "Heat pan",
          "Pour batter",
          ["Flip pancake", "Cook other side"]
        ],
        "Serve hot"
      ]
    },
    {
      name: "Sandwich",
      category: "Lunch",
      time: 10,
      ingredients: ["Bread", "Cheese", "Vegetables"],
      steps: [
        "Chop vegetables",
        "Assemble sandwich",
        "Serve"
      ]
    }
  ];

  let currentRecipes = [...recipes];
  const container = document.getElementById("recipeContainer");

  // Recursive function for steps
  function renderSteps(steps) {
    const ul = document.createElement("ul");

    steps.forEach(step => {
      const li = document.createElement("li");

      if (Array.isArray(step)) {
        li.appendChild(renderSteps(step)); // recursion
      } else {
        li.textContent = step;
      }

      ul.appendChild(li);
    });

    return ul;
  }

  // Render recipes
  function renderRecipes(list) {
    container.innerHTML = "";

    list.forEach((recipe, index) => {
      const card = document.createElement("div");
      card.className = "recipe-card";

      card.innerHTML = `
        <h3>${recipe.name}</h3>
        <p>Category: ${recipe.category}</p>
        <p>Time: ${recipe.time} mins</p>

        <button data-action="steps" data-index="${index}">Show Steps</button>
        <button data-action="ingredients" data-index="${index}">Show Ingredients</button>

        <div class="steps hidden"></div>
        <div class="ingredients hidden">
          <ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>
        </div>
      `;

      const stepsDiv = card.querySelector(".steps");
      stepsDiv.appendChild(renderSteps(recipe.steps));

      container.appendChild(card);
    });
  }

  // Event delegation
  function handleClick(e) {
    const action = e.target.dataset.action;
    const index = e.target.dataset.index;

    if (!action) return;

    const card = e.target.closest(".recipe-card");
    const section = card.querySelector(`.${action}`);

    section.classList.toggle("hidden");
    e.target.textContent =
      section.classList.contains("hidden")
        ? `Show ${action}`
        : `Hide ${action}`;
  }

  // Filters
  function filterRecipes(category) {
    currentRecipes =
      category === "All"
        ? [...recipes]
        : recipes.filter(r => r.category === category);

    renderRecipes(currentRecipes);
  }

  // Sorting
  function sortByName() {
    currentRecipes.sort((a, b) => a.name.localeCompare(b.name));
    renderRecipes(currentRecipes);
  }

  function sortByTime() {
    currentRecipes.sort((a, b) => a.time - b.time);
    renderRecipes(currentRecipes);
  }

  // Init
  function init() {
    renderRecipes(currentRecipes);

    document.body.addEventListener("click", handleClick);

    document.querySelectorAll("[data-filter]").forEach(btn =>
      btn.addEventListener("click", () =>
        filterRecipes(btn.dataset.filter)
      )
    );

    document.getElementById("sortName").addEventListener("click", sortByName);
    document.getElementById("sortTime").addEventListener("click", sortByTime);
  }

  // Public API
  return {
    init
  };
})();

RecipeApp.init();


