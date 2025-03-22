//là on verifie si le DOM est chargé à 100% pour executer le script
$(document).ready(function () {
  //partie connexion

  $("#emailConnexion, #motDePasseConnexion").on("input", function () {
    if ($("emailConnexion").val() && $("#motDePasseConnexion").val()) {
      $("button[type='submit']").prop("disabled", false);
    } else {
      $("button[type='submit']").prop("disabled", true);
    }
  }),
    //partie inscription
    $("#formInscription").on("submit", function (e) {
      e.preventDefault();

      const email = $("#emailInscription").val();
      const motDePasse = $("#motDePasseInscription").val();
      const confirmationMotDePasse = $("#motDePasseInscription").val();

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

      alert("Inscription reussie");
      window.location.href = "index.html";
    });

  $("#modalInscription").on("hidden.bs.modal", function () {
    $("#formInscription")[0].reset();
  });

  $("#seSouvenir").on("change", function () {
    if ($(this).is(":checked")) {
      localStorage.setItem("rememberMe", "true");
    } else {
      localStorage.removeItem("rememberMe");
    }
  });
  if (localStorage.getItem("rememberMe")) {
    $("#seSouvenir").prop("checked", true);
  }
});
