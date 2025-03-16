document.getElementById("button").addEventListener("click", () => {
  fetch("expression.txt") // On va chercher le fichier
    .then((response) => response.text()) // On lit son contenu en texte
    .then((data) => {
      let p = document.createElement("p"); // On crée un paragraphe
      p.textContent = data; // On met le texte dedans
      document.body.appendChild(p); // On l'ajoute à la page
    })
    .catch((error) => console.error("Erreur de Fetch :", error));
});
