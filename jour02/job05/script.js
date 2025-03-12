document.addEventListener("scroll", function () {
  let footer = document.getElementById("footer");

  // Hauteur totale scrollable
  let scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
  // Position actuelle de scroll
  let scrollPosition = window.scrollY;
  // Calcul du pourcentage de scroll
  let scrollPercent = (scrollPosition / scrollHeight) * 100;

  // Changer la couleur du footer selon le pourcentage de scroll
  footer.style.backgroundColor = `rgb(${scrollPercent * 2.55}, 0, ${
    255 - scrollPercent * 2.55
  })`;
});
