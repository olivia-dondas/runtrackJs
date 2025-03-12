let compteur = document.querySelector("compteur");
let button = document.getElementById("button");

button.addEventListener("click", function addOne() {
  document.getElementById("compteur").innerHTML = compteur++;
});
