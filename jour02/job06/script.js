// Définir la séquence du code Konami
const konamiCode = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

let konamiCodePosition = 0;

// Fonction pour détecter les touches pressées
document.addEventListener("keydown", function (event) {
  // Vérifier si la touche pressée correspond à la séquence
  if (event.key === konamiCode[konamiCodePosition]) {
    konamiCodePosition++;

    // Si le code est complet, appliquer le style
    if (konamiCodePosition === konamiCode.length) {
      // Ajouter la classe qui applique les couleurs de La Plateforme
      document.body.classList.add("la-plateforme");

      // Ajouter du contenu à la page après avoir déverrouillé le style
      const h1 = document.createElement("h1");
      h1.textContent = "Bienvenue sur la page de La Plateforme !";
      document.body.appendChild(h1);

      const p = document.createElement("p");
      p.textContent = "Vous avez déverrouillé le style ! Félicitations !";
      document.body.appendChild(p);

      konamiCodePosition = 0; // Réinitialiser la position du code
    }
  } else {
    // Réinitialiser si la séquence est rompue
    konamiCodePosition = 0;
  }
});

console.log("Le script JavaScript est bien chargé !");
