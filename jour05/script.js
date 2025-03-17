document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("connexion-form");

  // Liste des champs à valider
  const fields = {
    name: {
      element: document.getElementById("name"),
      rules: {
        required: true,
        minLength: 2,
      },
      errorMessage: "Le nom doit contenir au moins 2 caractères.",
    },
    "first-name": {
      element: document.getElementById("first-name"),
      rules: {
        required: true,
        minLength: 2,
      },
      errorMessage: "Le prénom doit contenir au moins 2 caractères.",
    },
    email: {
      element: document.getElementById("email"),
      rules: {
        required: true,
        emailFormat: true,
      },
      errorMessage: "Veuillez entrer une adresse email valide.",
    },
    password: {
      element: document.getElementById("password"),
      rules: {
        required: true,
        minLength: 6,
      },
      errorMessage: "Le mot de passe doit contenir au moins 6 caractères.",
    },
    adress: {
      element: document.getElementById("adress"),
      rules: {
        required: true,
        minLength: 5,
      },
      errorMessage: "L'adresse doit contenir au moins 5 caractères.",
    },
    "postal-code": {
      element: document.getElementById("postal-code"),
      rules: {
        required: true,
        numericOnly: true,
        lengthExact: 5,
      },
      errorMessage: "Le code postal doit être un nombre de 5 chiffres.",
    },
  };

  // Fonction pour afficher les erreurs
  function displayError(element, message) {
    let error = element.nextElementSibling; // Vérifie s'il y a déjà un message d'erreur
    if (!error || !error.classList.contains("error-message")) {
      error = document.createElement("div");
      error.className = "error-message";
      element.insertAdjacentElement("afterend", error);
    }
    error.textContent = message;
    element.classList.add("error-highlight");
  }

  // Fonction pour supprimer les erreurs
  function clearError(element) {
    const error = element.nextElementSibling;
    if (error && error.classList.contains("error-message")) {
      error.remove();
    }
    element.classList.remove("error-highlight");
  }

  // Fonction de validation d'un champ
  function validateField(field) {
    const { element, rules, errorMessage } = field;
    const value = element.value.trim();

    if (rules.required && value === "") {
      displayError(element, "Ce champ est obligatoire.");
      return false;
    }
    if (rules.minLength && value.length < rules.minLength) {
      displayError(element, errorMessage);
      return false;
    }
    if (rules.emailFormat && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      displayError(element, errorMessage);
      return false;
    }
    if (rules.numericOnly && !/^\d+$/.test(value)) {
      displayError(element, errorMessage);
      return false;
    }
    if (rules.lengthExact && value.length !== rules.lengthExact) {
      displayError(element, errorMessage);
      return false;
    }

    clearError(element);
    return true;
  }

  // Validation en temps réel
  Object.values(fields).forEach((field) => {
    field.element.addEventListener("input", () => validateField(field));
  });

  // Validation lors de la soumission du formulaire
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Empêche l'envoi par défaut

    let isValid = true;

    Object.values(fields).forEach((field) => {
      if (!validateField(field)) isValid = false;
    });

    if (isValid) {
      alert("Formulaire soumis avec succès !");
      form.submit(); // Soumet le formulaire si tout est valide
    }
  });
});
