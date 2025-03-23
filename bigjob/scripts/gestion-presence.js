$(document).ready(function () {
  // Récupérer l'utilisateur connecté depuis localStorage
  const utilisateurConnecte = lireUtilisateurConnecte();

  // Si aucun utilisateur n'est connecté, rediriger vers la page d'accueil
  if (!utilisateurConnecte) {
    window.location.href = "../index.html";
    return;
  }

  console.log("Utilisateur connecté :", utilisateurConnecte);

  // Afficher les demandes de présence au chargement de la page
  afficherDemandesPresence();

  // Gestion du formulaire de demande de présence
  $("#formDemandePresence").submit(function (event) {
    event.preventDefault();

    // Récupérer les valeurs des champs
    const dateDebut = $("#presence_start_date").val();
    const dateFin = $("#presence_end_date").val();
    const commentaire = $("#presence_commentaire").val();

    // Créer un objet pour représenter la demande de présence
    const demandePresence = {
      id: generateId(), // Ajoute un ID unique
      idUtilisateur: utilisateurConnecte.id,
      dateDebut: dateDebut,
      dateFin: dateFin,
      commentaire: commentaire,
      statut: "En attente",
    };

    // Ajouter la demande de présence dans localStorage
    ajouterDemandePresence(demandePresence);

    // Afficher les demandes de présence
    afficherDemandesPresence();

    // Réinitialiser le formulaire
    $("#formDemandePresence")[0].reset();
  });

  // Fonction pour lire l'utilisateur connecté depuis localStorage
  function lireUtilisateurConnecte() {
    const utilisateurJSON = localStorage.getItem("utilisateurConnecte");
    return utilisateurJSON ? JSON.parse(utilisateurJSON) : null;
  }

  function lireUtilisateurs() {
    try {
      const utilisateursJSON = localStorage.getItem("utilisateurs");
      return utilisateursJSON ? JSON.parse(utilisateursJSON) : null;
    } catch (error) {
      console.error(
        "Erreur lors de la lecture des utilisateurs depuis localStorage :",
        error
      );
      return [];
    }
  }

  // Fonction pour lire les demandes de présence depuis localStorage
  function lireDemandesPresence() {
    let demandes = localStorage.getItem("demandesPresence");
    return demandes ? JSON.parse(demandes) : [];
  }

  // Fonction pour ajouter une demande de présence dans localStorage
  function ajouterDemandePresence(demande) {
    let demandes = lireDemandesPresence();
    demandes.push(demande);
    localStorage.setItem("demandesPresence", JSON.stringify(demandes));
  }

  // Fonction pour afficher les demandes de présence
  function afficherDemandesPresence() {
    // Récupérer les demandes de présence
    const demandes = lireDemandesPresence();

    console.log("Demandes de présence :", demandes);

    // Filtrer les demandes pour l'utilisateur connecté
    const demandesUtilisateur = demandes.filter(
      (demande) => demande.idUtilisateur === utilisateurConnecte.id
    );

    console.log("Demandes de l'utilisateur :", demandesUtilisateur);

    // Générer le code HTML pour chaque demande
    let html = "";
    demandesUtilisateur.forEach((demande) => {
      html += `
          <tr>
            <td>${demande.dateDebut}</td>
            <td>${demande.dateFin}</td>
            <td>${demande.commentaire}</td>
            <td>${demande.statut}</td>
          </tr>
        `;
    });

    // Ajouter le code HTML dans le tableau
    $("#presence_presences_list").html(html);
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

  // Fonction pour générer un ID unique
  function generateId() {
    return Math.random().toString(36).substring(2, 15);
  }
});
