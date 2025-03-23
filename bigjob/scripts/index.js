$(document).ready(function () {
  // ---------------------------------------------------------------------------
  // 1. Initialisation
  // ---------------------------------------------------------------------------

  let utilisateurs = []; // Déclare une variable pour stocker les utilisateurs

  // Initialisation du local storage
  if (localStorage.getItem("utilisateurs") === null) {
    localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));
  }

  // ---------------------------------------------------------------------------
  // 2. Fonctions de gestion des utilisateurs (lecture, écriture, ajout)
  // ---------------------------------------------------------------------------

  // Fonction pour lire les utilisateurs depuis localStorage
  function lireUtilisateurs() {
    const utilisateursJSON = localStorage.getItem("utilisateurs");
    if (utilisateursJSON) {
      return JSON.parse(utilisateursJSON);
    } else {
      return utilisateurs; // Retourner les données initiales si localStorage est vide
    }
  }

  // Fonction pour écrire les utilisateurs dans localStorage
  function ecrireUtilisateurs(utilisateurs) {
    const utilisateursJSON = JSON.stringify(utilisateurs);
    localStorage.setItem("utilisateurs", utilisateursJSON);
  }

  // Fonction pour ajouter un utilisateur à localStorage
  function ajouterUtilisateur(utilisateur) {
    utilisateurs = lireUtilisateurs();
    utilisateurs.push(utilisateur);
    ecrireUtilisateurs(utilisateurs);
  }

  // ---------------------------------------------------------------------------
  // 3. Fonctions de validation (email, mot de passe, rôle)
  // ---------------------------------------------------------------------------

  // Fonction de validation de l'e-mail (avec regex)
  function validerEmail(email) {
    var regex = /^[a-zA-Z0-9._-]+@laplateforme\.io$/;
    return regex.test(email);
  }

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

  // Fonction pour "hacher" le mot de passe (sans bcryptjs)
  function hacherMotDePasse(motDePasse) {
    return motDePasse;
  }

  // Fonction pour "vérifier" le mot de passe (sans bcryptjs)
  function verifierMotDePasse(motDePasseEnClair, motDePasseHache) {
    console.log(
      "Mot de passe en clair : " +
        motDePasseEnClair +
        " et mot de passe Haché : " +
        motDePasseHache
    );
    return motDePasseEnClair === motDePasseHache;
  }

  // ---------------------------------------------------------------------------
  // 4. Fonctions de gestion des formulaires (inscription, connexion)
  // ---------------------------------------------------------------------------

  // Partie inscription
  $("#formInscription").on("submit", function (e) {
    gererFormulaireInscription(e);
  });

  function gererFormulaireInscription(e) {
    e.preventDefault();

    const nom = $("#nomInscription").val();
    const email = $("#emailInscription").val();
    const motDePasse = $("#motDePasseInscription").val();
    const confirmationMotDePasse = $("#motDePasseConfirmation").val(); // Correction : il faut utiliser le champ de confirmation

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

    // Créer l'objet utilisateur
    const utilisateur = {
      id: generateId(),
      nom: nom,
      email: email,
      motDePasse: motDePasse,
      role: determinerRole(email), // Déterminer le rôle en fonction de l'adresse e-mail
    };

    //On recupere les utilisateurs depuis le local storage
    utilisateurs = lireUtilisateurs();

    // Ajouter l'utilisateur au tableau
    utilisateurs.push(utilisateur);

    // Écrire les utilisateurs dans localStorage
    ecrireUtilisateurs(utilisateurs);

    alert("Inscription réussie");
    window.location.href = "index.html"; // Redirection vers la page d'accueil après inscription
  }

  // Gestion du formulaire de connexion
  $("#formConnexion").submit(function (event) {
    gererFormulaireConnexion(event);
  });

  function gererFormulaireConnexion(event) {
    event.preventDefault();

    const emailConnexion = $("#emailConnexion").val();
    const motDePasseConnexion = $("#motDePasseConnexion").val();

    // Trouver l'utilisateur correspondant à l'adresse e-mail
    let utilisateur = utilisateurs.find((u) => u.email === emailConnexion);

    if (utilisateur) {
      console.log("Utilisateur trouvé :", utilisateur);

      // Vérifier le mot de passe
      if (verifierMotDePasse(motDePasseConnexion, utilisateur.motDePasse)) {
        console.log("Connexion réussie !");

        // Stocker l'utilisateur connecté dans localStorage
        localStorage.setItem(
          "utilisateurConnecte",
          JSON.stringify(utilisateur)
        );
        console.log("Utilisateur stocké dans localStorage :", utilisateur); // Ajoute cette ligne

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
  }
  // ---------------------------------------------------------------------------
  // 5. Fonctions utilitaires (génération d'ID, etc.)
  // ---------------------------------------------------------------------------
  // Fonction pour générer un ID unique
  function generateId() {
    return Math.random().toString(36).substring(2, 15);
  }

  // ---------------------------------------------------------------------------
  // 6. Gestion des événements (inscription, connexion, etc.)
  // ---------------------------------------------------------------------------

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
