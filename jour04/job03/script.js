document.getElementById("filter-button").addEventListener("click", () => {
  fetch("pokemon.json")
    .then((response) => response.json())
    .then((pokemons) => {
      let id = document.getElementById("id").value.trim();
      let name = document.getElementById("name").value.trim().toLowerCase();
      let type = document.getElementById("type").value;

      let filteredPokemons = pokemons.filter((pokemon) => {
        return (
          (!id || pokemon.id.toString() === id) &&
          (!name || pokemon.name.french.toLowerCase().includes(name)) &&
          (!type || pokemon.type.includes(type))
        );
      });

      displayResults(filteredPokemons);
    })
    .catch((error) => console.error("Erreur de chargement du JSON :", error));
});

function displayResults(pokemons) {
  let resultsContainer = document.getElementById("results");
  resultsContainer.innerHTML = ""; // Vide la liste précédente

  if (pokemons.length === 0) {
    resultsContainer.innerHTML = "<li>Aucun Pokémon trouvé.</li>";
    return;
  }

  pokemons.forEach((pokemon) => {
    let li = document.createElement("li");
    li.textContent = `#${pokemon.id} - ${
      pokemon.name.french
    } (Type: ${pokemon.type.join(", ")})`;
    resultsContainer.appendChild(li);
  });
}
