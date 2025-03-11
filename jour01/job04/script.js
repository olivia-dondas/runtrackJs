function bisextile() {
  let annee = document.getElementById("annee").value;
  if (annee % 4 == 0 && (annee % 100 != 0 || annee % 400 == 0)) {
    return true;
  } else {
    return false;
  }
}
