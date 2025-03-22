$(document).ready(function () {
  // 1. Vérification du rôle de l'administrateur
  const utilisateurConnecte = lireUtilisateurConnecte();
  if (!utilisateurConnecte || utilisateurConnecte.role !== "administrateur") {
    // Rediriger vers la page d'accueil si l'utilisateur n'est pas un administrateur
    window.location.href = "index.html";
    return;
  }

  // 2. Afficher la liste des demandes de présence
  afficherDemandesPresence();

  // Fonction pour afficher la liste des demandes de présence
  async function afficherDemandesPresence() {
    const demandesPresence = lireDemandesPresence();
    const utilisateurs = lireUtilisateurs();

    // Créer le tableau HTML
    let tableauHTML = `
        <table class="table">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Email</th>
              <th>Date</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
      `;

    for (const demande of demandesPresence) {
      // Récupérer l'utilisateur correspondant à la demande
      const utilisateur = utilisateurs.find(
        (u) => u.id === demande.idUtilisateur
      );

      if (utilisateur) {
        tableauHTML += `
            <tr>
              <td>${utilisateur.nom}</td>
              <td>${utilisateur.email}</td>
              <td>${demande.date}</td>
              <td>${demande.statut}</td>
              <td>
                <button class="btn btn-success btn-sm accepter" data-id="${demande.idUtilisateur}" data-date="${demande.date}">Accepter</button>
                <button class="btn btn-danger btn-sm refuser" data-id="${demande.idUtilisateur}" data-date="${demande.date}">Refuser</button>
              </td>
            </tr>
          `;
      }
    }

    tableauHTML += `
          </tbody>
        </table>
      `;

    // Afficher le tableau dans la page
    $("#listeDemandesPresence").html(tableauHTML);

    // 3. Gérer les actions (Accepter/Refuser)
    $(".accepter").click(function () {
      const idUtilisateur = $(this).data("id");
      const date = $(this).data("date");
      modifierStatutDemande(idUtilisateur, date, "acceptee");
    });

    $(".refuser").click(function () {
      const idUtilisateur = $(this).data("id");
      const date = $(this).data("date");
      modifierStatutDemande(idUtilisateur, date, "refusee");
    });
  }

  // Fonction pour modifier le statut d'une demande de présence
  async function modifierStatutDemande(idUtilisateur, date, statut) {
    let demandesPresence = lireDemandesPresence();

    // Trouver la demande à modifier
    const demandeIndex = demandesPresence.findIndex(
      (d) => d.idUtilisateur === idUtilisateur && d.date === date
    );

    if (demandeIndex !== -1) {
      // Modifier le statut
      demandesPresence[demandeIndex].statut = statut;

      // Écrire les modifications dans localStorage
      ecrireDemandesPresence(demandesPresence);

      // Mettre à jour l'affichage
      afficherDemandesPresence();
    }
  }

  // Fonctions utilitaires (à adapter à ton code existant)
  function lireUtilisateurConnecte() {
    // Récupérer l'utilisateur connecté depuis localStorage (à adapter)
    const utilisateurJSON = localStorage.getItem("utilisateurConnecte");
    return utilisateurJSON ? JSON.parse(utilisateurJSON) : null;
  }

  function lireDemandesPresence() {
    // Récupérer les demandes de présence depuis localStorage (à adapter)
    const demandesJSON = localStorage.getItem("demandesPresence");
    return demandesJSON ? JSON.parse(demandesJSON) : [];
  }

  function lireUtilisateurs() {
    // Récupérer les utilisateurs depuis localStorage (à adapter)
    const utilisateursJSON = localStorage.getItem("utilisateurs");
    return utilisateursJSON ? JSON.parse(utilisateursJSON) : [];
  }

  function ecrireDemandesPresence(demandes) {
    // Écrire les demandes de présence dans localStorage (à adapter)
    localStorage.setItem("demandesPresence", JSON.stringify(demandes));
  }
});
