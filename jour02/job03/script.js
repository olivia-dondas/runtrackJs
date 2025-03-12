let compteur = document.querySelector("compteur");
let button = document.getElementById("button");

button.addEventListener("click", function increment() {
  document.getElementById("compteur").innerHTML = compteur++;
});
