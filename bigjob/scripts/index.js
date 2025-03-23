$(document).ready(function () {
  // Déclaration du tableau des utilisateurs
  let utilisateurs = [];

  // Fonction pour lire les utilisateurs depuis data.json
  function lireUtilisateursDepuisFichier() {
    $.ajax({
      url: "data.json",
      dataType: "json",
      async: false, // Important : pour que les données soient chargées avant de continuer
      success: function (data) {
        utilisateurs = data.utilisateurs;
        console.log("Utilisateurs chargés depuis data.json :", utilisateurs);

        // Stocke les utilisateurs dans le localStorage
        ecrireUtilisateurs(utilisateurs);
      },
      error: function (jqXHR, textStatus, errorThrown) {
        console.error(
          "Erreur lors du chargement de data.json :",
          textStatus,
          errorThrown
        );
      },
    });
  }

  // Fonction pour lire les utilisateurs depuis localStorage
  function lireUtilisateurs() {
    try {
      const utilisateursJSON = localStorage.getItem("utilisateurs");
      return utilisateursJSON ? JSON.parse(utilisateursJSON) : [];
    } catch (error) {
      console.error(
        "Erreur lors de la lecture des utilisateurs depuis localStorage :",
        error
      );
      return [];
    }
  }

  // Fonction pour écrire les utilisateurs dans localStorage
  function ecrireUtilisateurs(utilisateurs) {
    localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));
  }

  // Charge les utilisateurs depuis data.json et stocke-les dans localStorage au démarrage
  lireUtilisateursDepuisFichier();

  // Gestion du formulaire de connexion
  $("#formConnexion").submit(function (event) {
    event.preventDefault();

    const emailConnexion = $("#emailConnexion").val();
    const motDePasseConnexion = $("#motDePasseConnexion").val();

    // Récupère les utilisateurs depuis le localStorage
    const utilisateurs = lireUtilisateurs();

    // Trouver l'utilisateur correspondant à l'adresse e-mail
    let utilisateur = utilisateurs.find((u) => u.email === emailConnexion);

    if (utilisateur) {
      console.log("Utilisateur trouvé :", utilisateur);

      // Vérifier le mot de passe
      if (motDePasseConnexion == utilisateur.motDePasse) {
        console.log("Connexion réussie !");

        // Stocker l'utilisateur connecté dans localStorage
        localStorage.setItem(
          "utilisateurConnecte",
          JSON.stringify(utilisateur)
        );

        // Rediriger l'utilisateur vers la page appropriée
        if (utilisateur.role === "administrateur") {
          window.location.href = "pages/admin.html";
        } else {
          window.location.href = "pages/gestion-presence.html";
        }
      } else {
        alert("Mot de passe incorrect.");
      }
    } else {
      alert("Adresse e-mail incorrecte.");
    }
  });

  // Fonction pour déterminer le rôle
  function determinerRole(email) {
    // Liste blanche des administrateurs
    const administrateurs = [
      "olivia.dondas@laplateforme.io",
      "olive.dani@laplateforme.io",
      // ... Ajouter les adresses e-mail des administrateurs
    ];
    if (administrateurs.includes(email)) {
      return "administrateur";
    } else {
      return "etudiant";
    }
  }

  // Fonction pour générer un ID unique
  function generateId() {
    return Math.random().toString(36).substring(2, 15);
  }

  // Gestion du formulaire d'inscription
  $("#formInscription").on("submit", function (event) {
    event.preventDefault();

    const nom = $("#nomInscription").val();
    const email = $("#emailInscription").val();
    const motDePasse = $("#motDePasseInscription").val();
    const confirmationMotDePasse = $("#motDePasseConfirmation").val();

    if (!email.endsWith("@laplateforme.io")) {
      alert("Veuillez utiliser le format nom.prenom@laplateforme.io");
      return;
    }
    if (motDePasse !== confirmationMotDePasse) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    if (motDePasse.length < 8) {
      alert("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }
    if (!motDePasse.match(/[A-Z]/)) {
      alert("Le mot de passe doit contenir au moins une lettre majuscule");
      return;
    }
    if (!motDePasse.match(/[0-9]/)) {
      alert("Le mot de passe doit contenir au moins un chiffre");
      return;
    }

    const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordPattern.test(motDePasse)) {
      alert(
        "Le mot de passe doit contenir au moins 8 caractères, une lettre majuscule et un chiffre"
      );
      return;
    }

    const utilisateur = {
      id: generateId(),
      nom: nom,
      email: email,
      motDePasse: motDePasse,
      role: determinerRole(email),
    };

    // Récupère les utilisateurs depuis le localStorage
    const utilisateurs = lireUtilisateurs();

    // Ajoute le nouvel utilisateur au tableau
    utilisateurs.push(utilisateur);

    // Stocke les informations des utilisateurs dans le localStorage
    ecrireUtilisateurs(utilisateurs);

    alert("Inscription réussie");
    window.location.href = "index.html";
  });

  // Réinitialisation du formulaire d'inscription après la fermeture du modal
  $("#modalInscription").on("hidden.bs.modal", function () {
    $("#formInscription")[0].reset();
  });

  // Gestion de la case "Se souvenir de moi"
  $("#seSouvenir").on("change", function () {
    if ($(this).is(":checked")) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }
  });

  // Vérification du statut de la case "Se souvenir de moi" au chargement de la page
  if (localStorage.getItem("rememberMe")) {
    $("#seSouvenir").prop("checked", true);
  }
});
