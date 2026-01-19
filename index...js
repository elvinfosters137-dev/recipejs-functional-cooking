const searchInput = document.getElementById("searchInput");
let searchTerm = "";

// Debounce utility
const debounce = (fn, delay = 300) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
};

const handleSearch = debounce((e) => {
  searchTerm = e.target.value.toLowerCase();
  renderRecipes();
});

searchInput.addEventListener("input", handleSearch);

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

const toggleFavorite = (id) => {
  if (favorites.includes(id)) {
    favorites = favorites.filter(fid => fid !== id);
  } else {
    favorites.push(id);
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  renderRecipes();
};

const isFav = favorites.includes(recipe.id);

<button class="fav-btn" onclick="toggleFavorite(${recipe.id})">
  ${isFav ? "❤️" : "🤍"}
</button>

const favOnlyCheckbox = document.getElementById("favOnly");
let showFavOnly = false;

favOnlyCheckbox.addEventListener("change", (e) => {
  showFavOnly = e.target.checked;
  renderRecipes();
});

const recipeCounter = document.getElementById("recipeCounter");

recipeCounter.textContent = `Showing ${filteredRecipes.length} of ${recipes.length} recipes`;

const renderRecipes = () => {
  let filtered = [...recipes];

  // Search filter
  if (searchTerm) {
    filtered = filtered.filter(r =>
      r.title.toLowerCase().includes(searchTerm) ||
      r.ingredients.join(",").toLowerCase().includes(searchTerm)
    );
  }

  // Favorites-only filter
  if (showFavOnly) {
    filtered = filtered.filter(r => favorites.includes(r.id));
  }

  recipeContainer.innerHTML = "";

  filtered.forEach(recipe => {
    recipeContainer.innerHTML += createRecipeCard(recipe);
  });

  recipeCounter.textContent = `Showing ${filtered.length} of ${recipes.length} recipes`;
};
