// Liste blanche d'adresses e-mails pour les administrateurs
const emailsAdmins = [
  "olivia.dondas@laplateforme.io",
  "olive.dani@laplateforme.io",
];

// Fonction pour gérer la soumission du formulaire de connexion
$("#formConnexion").on("submit", function (e) {
  e.preventDefault();

  const email = $("#emailConnexion").val();
  const motDePasse = $("#motDePasseConnexion").val();

  // Vérifier si l'email est dans la liste des administrateurs
  if (emailsAdmins.includes(email)) {
    console.log("Bienvenue, Administrateur");
    localStorage.setItem("userRole", "administrateur");
  } else {
    console.log("Bienvenue, Étudiant");
    localStorage.setItem("userRole", "etudiant");
  }

  // Pour une gestion basique, on peut sauvegarder l'email dans localStorage aussi
  localStorage.setItem("email", email);

  // Si tu veux simuler une redirection vers une page d'accueil, tu peux faire ça ici
  window.location.href = "page_accueil.html"; // Redirection vers la page d'accueil (par exemple)
});
