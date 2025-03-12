let article = document.querySelector("article");
let button = document.getElementById("button");

button.addEventListener("click", function showhide() {
  if (article.style.display === "none") {
    article.style.display = "block";
  } else {
    article.style.display = "none";
  }
});
