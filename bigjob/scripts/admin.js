$(document).ready(function () {
  // 1. Vérification du rôle de l'administrateur
  const utilisateurConnecte = lireUtilisateurConnecte();
  console.log("Admin connecté :", utilisateurConnecte);

  if (!utilisateurConnecte || utilisateurConnecte.role !== "administrateur") {
    // Rediriger vers la page d'accueil si l'utilisateur n'est pas un administrateur
    window.location.href = "../index.html";
    return;
  }

  // 2. Afficher la liste des demandes de présence
  afficherDemandesPresence();

  // Fonction pour afficher la liste des demandes de présence
  function afficherDemandesPresence() {
    const demandesPresence = lireDemandesPresence();
    console.log("Toutes les demandes :", demandesPresence);
    const utilisateurs = lireUtilisateurs();
    console.log("Tous les utilisateurs :", utilisateurs);

    // Vérifie si le tableau 'utilisateurs' est null ou undefined
    if (!utilisateurs) {
      console.error("Le tableau 'utilisateurs' est null ou undefined !");
      return;
    }

    // Récupérer le tableau des demandes de présence
    const tableauDemandes = $("#listeDemandesPresence");

    // Vider le tableau
    tableauDemandes.empty();

    // Créer le tableau HTML
    let tableauHTML = "";

    for (const demande of demandesPresence) {
      // Vérifie si l'utilisateur est trouvé avant d'accéder à ses propriétés
      const utilisateur = utilisateurs.find(
        (u) => u.id === demande.idUtilisateur
      );

      if (utilisateur) {
        tableauHTML += `
          <tr>
            <td>${utilisateur.nom}</td>
            <td>${utilisateur.email}</td>
            <td>${demande.dateDebut}</td>
            <td>${demande.dateFin}</td>
            <td>${demande.statut}</td>
            <td>
              <button class="btn btn-success btn-sm action-modifier-statut" data-id="${demande.id}" data-statut="acceptee">Approuver</button>
              <button class="btn btn-danger btn-sm action-modifier-statut" data-id="${demande.id}" data-statut="refusee">Refuser</button>
            </td>
          </tr>
        `;
      }
    }

    console.log("Code HTML généré :", tableauHTML);

    // Afficher le tableau dans la page
    tableauDemandes.html(tableauHTML);

    // 3. Gérer les actions (Accepter/Refuser)
    $(".action-modifier-statut").click(function () {
      const idDemande = $(this).data("id");
      const statut = $(this).data("statut");
      modifierStatutDemande(idDemande, statut);
    });
  }

  // Fonction pour modifier le statut d'une demande de présence
  function modifierStatutDemande(idDemande, statut) {
    let demandesPresence = lireDemandesPresence();

    // Trouver la demande à modifier
    const demandeIndex = demandesPresence.findIndex((d) => d.id === idDemande);

    if (demandeIndex !== -1) {
      // Modifier le statut
      demandesPresence[demandeIndex].statut = statut;

      // Écrire les modifications dans localStorage
      ecrireDemandesPresence(demandesPresence);

      // Mettre à jour l'affichage
      afficherDemandesPresence();
    }
  }

  // Fonctions utilitaires
  function lireUtilisateurConnecte() {
    const utilisateurJSON = localStorage.getItem("utilisateurConnecte");
    return utilisateurJSON ? JSON.parse(utilisateurJSON) : null;
  }

  function lireDemandesPresence() {
    try {
      const demandesJSON = localStorage.getItem("demandesPresence");
      return demandesJSON ? JSON.parse(demandesJSON) : [];
    } catch (error) {
      console.error(
        "Erreur lors de la lecture des demandes de présence depuis localStorage :",
        error
      );
      return [];
    }
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

  function ecrireDemandesPresence(demandes) {
    try {
      localStorage.setItem("demandesPresence", JSON.stringify(demandes));
    } catch (error) {
      console.error(
        "Erreur lors de l'écriture des demandes de présence dans localStorage :",
        error
      );
    }
  }
});
