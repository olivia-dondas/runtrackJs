// Focus sur le premier champ du modal
const modalInscription = document.getElementById("modalInscription");
const nomInscription = document.getElementById("nomInscription");

modalInscription.addEventListener("shown.bs.modal", () => {
  nomInscription.focus();
});

// Gestion du formulaire d'inscription
document
  .getElementById("formInscription")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    // Récupérer les valeurs des champs
    var nom = document.getElementById("nomInscription").value;
    var prefixe = document.getElementById("emailInscriptionPrefixe").value;
    var domaine = document.getElementById("emailInscriptionDomaine").value;
    var motDePasse = document.getElementById("motDePasseInscription").value;

    // Reconstituer l'adresse e-mail complète
    var emailComplet = prefixe + domaine;

    // Déterminer le rôle
    var role = determinerRole(emailComplet);

    // Valider l'adresse e-mail
    if (!validerEmail(emailComplet)) {
      alert(
        "Adresse e-mail invalide. Veuillez utiliser le format nom.prenom@laplateforme.io"
      );
      return;
    }

    // Hacher le mot de passe
    var motDePasseHache = await hacherMotDePasse(motDePasse);

    // Créer l'objet utilisateur
    var utilisateur = {
      id: generateId(),
      nom: nom,
      email: emailComplet,
      motDePasse: motDePasseHache,
      role: role,
    };

    // Ajouter l'utilisateur à localStorage
    await ajouterUtilisateur(utilisateur);

    console.log("Utilisateur inscrit avec le rôle : " + role);

    // Réinitialiser le formulaire
    document.getElementById("formInscription").reset();

    // Fermer le modal après l'inscription
    var modal = bootstrap.Modal.getInstance(
      document.getElementById("modalInscription")
    );
    modal.hide();
  });

// Fonction de validation de l'e-mail (avec regex)
function validerEmail(email) {
  var regex = /^[a-zA-Z0-9._-]+@laplateforme\.io$/;
  return regex.test(email);
}

// Liste blanche des administrateurs
const administrateurs = [
  "olivia.dondas@laplateforme.io",
  "olive.dani@laplateforme.io",
];

// Fonction pour déterminer le rôle
function determinerRole(email) {
  if (administrateurs.includes(email)) {
    return "administrateur";
  } else {
    return "etudiant";
  }
}

// Fonction pour hacher le mot de passe (à implémenter avec bcryptjs ou js-sha256)
async function hacherMotDePasse(motDePasse) {
  // Exemple avec SHA-256 (à remplacer par bcryptjs en production)
  const hash = sha256(motDePasse);
  return hash;
}

// Fonction pour ajouter un utilisateur à localStorage
async function ajouterUtilisateur(utilisateur) {
  let utilisateurs = lireUtilisateurs();
  utilisateurs.push(utilisateur);
  ecrireUtilisateurs(utilisateurs);
}

// Fonction pour lire les utilisateurs depuis localStorage
function lireUtilisateurs() {
  const utilisateursJSON = localStorage.getItem("utilisateurs");
  if (utilisateursJSON) {
    return JSON.parse(utilisateursJSON);
  } else {
    return [];
  }
}

// Fonction pour écrire les utilisateurs dans localStorage
function ecrireUtilisateurs(utilisateurs) {
  const utilisateursJSON = JSON.stringify(utilisateurs);
  localStorage.setItem("utilisateurs", utilisateursJSON);
}

// Fonction pour générer un ID unique
function generateId() {
  return Math.random().toString(36).substring(2, 15);
}
