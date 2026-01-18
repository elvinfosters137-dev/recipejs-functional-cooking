const recipes = [
  {
    name: "Aloo",
    category: "Breakfast",
    time: 15,
    ingredients: ["Flour", "Eggs", "Milk", "Sugar"],
    steps: [
      "Mix dry ingredients",
      "Add wet ingredients",
      {
        step: "Cook on skillet",
        substeps: [
          "Heat skillet",
          "Pour batter",
          "Flip pancakes when bubbles form"
        ]
      },
      "Serve with syrup"
    ]
  },
  {
    name: "allo tikki",
    category: "Lunch",
    time: 10,
    ingredients: ["Bread", "Lettuce", "Tomato", "Cheese"],
    steps: [
      "Take two slices of bread",
      "Add fillings",
      "Close sandwich"
    ]
  }
];

const RecipeApp = (function() {
  // Private variables
  let recipeData = recipes; // can replace with fetch later if needed
  const recipeContainer = document.getElementById("recipe-container");

  // Private function: Recursive rendering of steps
  function renderSteps(steps) {
    const ul = document.createElement("ul");

    steps.forEach(item => {
      const li = document.createElement("li");

      if (typeof item === "string") {
        li.textContent = item;
      } else if (typeof item === "object") {
        li.textContent = item.step;
        if (item.substeps) {
          li.appendChild(renderSteps(item.substeps)); // recursion
        }
      }

      ul.appendChild(li);
    });

    return ul;
  }

  // Private function: Create a recipe card
  function createRecipeCard(recipes) {
    const card = document.createElement("div");
    card.classList.add("recipe-card");

    card.innerHTML = `
      <h3>${recipe.name}</h3>
      <p>Category: ${recipes.category}</p>
      <p>Time: ${recipes.time} minutes</p>
      <button class="show-steps-btn">Show Steps</button>
      <button class="show-ingredients-btn">Show Ingredients</button>
      <div class="steps" style="display:none;"></div>
      <div class="ingredients" style="display:none;"></div>
    `;

    recipeContainer.appendChild(card);

    const stepsDiv = card.querySelector(".steps");
    const ingredientsDiv = card.querySelector(".ingredients");

    // Render steps
    stepsDiv.appendChild(renderSteps(recipe.steps));

    // Render ingredients
    ingredientsDiv.innerHTML = `<ul>${recipe.ingredients.map(i => `<li>${i}</li>`).join("")}</ul>`;
  }

  // Private function: Render all recipes
  function renderRecipes(recipes) {
    recipeContainer.innerHTML = "";
    recipes.forEach(createRecipeCard);
  }

  // Event delegation for buttons
  function handleClicks(e) {
    const card = e.target.closest(".recipe-card");
    if (!card) return;

    if (e.target.classList.contains("show-steps-btn")) {
      const stepsDiv = card.querySelector(".steps");
      stepsDiv.style.display = stepsDiv.style.display === "none" ? "block" : "none";
    }

    if (e.target.classList.contains("show-ingredients-btn")) {
      const ingredientsDiv = card.querySelector(".ingredients");
      ingredientsDiv.style.display = ingredientsDiv.style.display === "none" ? "block" : "none";
    }
  }

  // Public method: initialize app
  function init() {
    renderRecipes(recipeData);
    recipeContainer.addEventListener("click", handleClicks);
  }

  return { init };
})();
