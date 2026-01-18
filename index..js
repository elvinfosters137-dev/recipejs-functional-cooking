const recipes = [
  { name: "Pasta", difficulty: "Moderate", time: 20 },
  { name: "Biryani", difficulty: "Hard", time: 60 },
  { name: "Salad", difficulty: "Easy", time: 10 },
  { name: "Burger", difficulty: "Medium", time: 30 }
];

let currentFilter = "ALL";
let currentSort = "NAME";

const filterRecipes = (recipes, filter) => {
  switch (filter) {
    case "EASY":
      return recipes.filter(r => r.difficulty === "Easy");
    case "MEDIUM":
      return recipes.filter(r => r.difficulty === "Medium");
    case "HARD":
      return recipes.filter(r => r.difficulty === "Hard");
    case "QUICK":
      return recipes.filter(r => r.time < 30);
    default:
      return recipes;
  }
};

const sortRecipes = (recipes, sortType) => {
  const copy = [...recipes]; // avoid mutation

  switch (sortType) {
    case "TIME":
      return copy.sort((a, b) => a.time - b.time);
    case "NAME":
    default:
      return copy.sort((a, b) => a.name.localeCompare(b.name));
  }
};

const updateDisplay = () => {
  const filtered = filterRecipes(recipes, currentFilter);
  const sorted = sortRecipes(filtered, currentSort);
  renderRecipes(sorted);
};

const renderRecipes = (recipes) => {
  const list = document.getElementById("recipe-list");
  list.innerHTML = "";

  recipes.forEach(r => {
    const li = document.createElement("li");
    li.textContent = `${r.name} - ${r.difficulty} - ${r.time} min`;
    list.appendChild(li);
  });
};

document.getElementById("all").onclick = () => {
  currentFilter = "ALL";
  updateDisplay();
};

document.getElementById("easy").onclick = () => {
  currentFilter = "EASY";
  updateDisplay();
};

document.getElementById("quick").onclick = () => {
  currentFilter = "QUICK";
  updateDisplay();
};

document.getElementById("sort-name").onclick = () => {
  currentSort = "NAME";
  updateDisplay();
};

document.getElementById("sort-time").onclick = () => {
  currentSort = "TIME";
  updateDisplay();
};


