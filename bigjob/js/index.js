const myModal = document.getElementById("myModal");
const myInput = document.getElementById("myInput");

myModal.addEventListener("shown.bs.modal", () => {
  myInput.focus();
});

document
  .getElementById("formInscription")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Empêcher la soumission par défaut

    // Récupérer les valeurs
    var prefixe = document.getElementById("emailInscriptionPrefixe").value;
    var domaine = document.getElementById("emailInscriptionDomaine").value;

    // Reconstituer l'adresse e-mail complète
    var emailComplet = prefixe + domaine;

    // Valider l'adresse e-mail
    if (!validerEmail(emailComplet)) {
      alert(
        "Adresse e-mail invalide. Veuillez utiliser le format nom.prenom@laplateforme.io"
      );
      return; // Empêcher la soumission si l'adresse est invalide
    }

    // Ici, tu peux envoyer les données (simulées) ou faire ce que tu dois faire avec l'adresse e-mail
    console.log("Adresse e-mail complète : " + emailComplet);

    // Réinitialiser le formulaire (optionnel)
    document.getElementById("formInscription").reset();
  });

// Fonction de validation de l'e-mail (simple)
function validerEmail(email) {
  var regex = /^[a-zA-Z0-9._-]+@laplateforme\.io$/;
  return regex.test(email);
}
