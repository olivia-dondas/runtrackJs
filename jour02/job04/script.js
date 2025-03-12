let textarea = document.getElementById("keylogger");

document.addEventListener("keydown", function (event) {
  // Vérifie si la touche pressée est une lettre (a-z ou A-Z)
  if (event.key.length === 1 && event.key.match(/[a-z]/i)) {
    // Si le textarea a le focus, on ajoute deux fois la lettre
    if (document.activeElement === textarea) {
      textarea.value += event.key + event.key;
    } else {
      textarea.value += event.key;
    }
  }
});
