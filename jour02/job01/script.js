function citation() {
  let citationText = document.getElementById("citation").textContent;
  console.log(citationText);
}

let button = document.getElementById("button");
button.addEventListener("click", citation);
