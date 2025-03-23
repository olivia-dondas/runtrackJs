$(document).ready(function () {
  const emailsAdmins = [
    "olivia.dondas@laplateforme.io",
    "olive.dani@laplateforme.io",
  ];

  const emailsEtudiants = [
    "student1@laplateforme.io",
    "student2@laplateforme.io",
    // Ajouter d'autres emails d'étudiants ici
  ];

  // Écoute des changements sur les champs email et mot de passe
  $("#emailConnexion, #motDePasseConnexion").on("input", function () {
    // Activer le bouton seulement si les deux champs sont remplis
    $("#submitConnexion").prop(
      "disabled",
      !$("#emailConnexion").val() || !$("#motDePasseConnexion").val()
    );
  });

  // Gestion de la soumission du formulaire
  $("#formConnexion").on("submit", function (e) {
    e.preventDefault();

    const email = $("#emailConnexion").val();
    const motDePasse = $("#motDePasseConnexion").val();

    if (!email || !motDePasse) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    let redirection = ""; // Variable pour stocker l'URL de redirection

    if (emailsAdmins.includes(email)) {
      console.log("Bienvenue, Administrateur");
      localStorage.setItem("userRole", "administrateur");
      localStorage.setItem("email", email);
      redirection = "pages/admin.html";
    } else if (emailsEtudiants.includes(email)) {
      console.log("Bienvenue, Étudiant");
      localStorage.setItem("userRole", "etudiant");
      localStorage.setItem("email", email);
      redirection = "pages/gestion-presence.html";
    } else {
      alert("Adresse e-mail inconnue. Veuillez vérifier votre saisie.");
      return;
    }

    // Redirection si l'adresse e-mail est connue
    if (redirection) {
      window.location.href = redirection;
    }
  });
});
