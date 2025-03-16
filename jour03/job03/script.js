$(document).ready(function () {
  const puzzle = $("#puzzle");
  const tiles = [];
  let emptyIndex = 8; // Index de la case vide (initialement en bas à droite)

  // Générer les carreaux
  for (let i = 0; i < 9; i++) {
    if (i < 8) {
      const tile = $("<div>")
        .addClass("tile")
        .attr("data-index", i)
        .css("background-image", `url(assets/logo${i + 1}.png)`)
        .css("background-size", "cover")
        .css("background-position", "center")
        .click(moveTile); // Lier l'événement de clic
      tiles.push(tile);
    } else {
      const emptyTile = $("<div>").addClass("tile empty");
      tiles.push(emptyTile);
    }
  }

  // Mélanger les carreaux
  shuffleTiles();

  // Afficher les carreaux dans le puzzle
  tiles.forEach((tile) => puzzle.append(tile));

  // Gestion du clic sur un carreau
  function moveTile() {
    const clickedIndex = $(this).data("index");
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;
    const clickedRow = Math.floor(clickedIndex / 3);
    const clickedCol = clickedIndex % 3;

    // Vérifier si le carreau cliqué est adjacent à la case vide
    if (
      (Math.abs(emptyRow - clickedRow) === 1 && emptyCol === clickedCol) || // Même colonne, ligne adjacente
      (Math.abs(emptyCol - clickedCol) === 1 && emptyRow === clickedRow) // Même ligne, colonne adjacente
    ) {
      // Échanger les positions
      swapTiles(clickedIndex, emptyIndex);
      emptyIndex = clickedIndex; // Mettre à jour l'index de la case vide

      // Vérifier si le puzzle est résolu
      if (isSolved()) {
        $(".message").text("Vous avez gagné").addClass("win");
        $("#restartButton").show();
        $(".tile").off("click"); // Désactiver les clics
      }
    }
  }

  // Mélanger les carreaux
  function shuffleTiles() {
    let moves = 100; // Nombre de mouvements pour mélanger
    for (let i = 0; i < moves; i++) {
      let possibleMoves = [];
      let emptyRow = Math.floor(emptyIndex / 3);
      let emptyCol = emptyIndex % 3;

      // Vérifier les mouvements possibles
      if (emptyRow > 0) possibleMoves.push(emptyIndex - 3); // Haut
      if (emptyRow < 2) possibleMoves.push(emptyIndex + 3); // Bas
      if (emptyCol > 0) possibleMoves.push(emptyIndex - 1); // Gauche
      if (emptyCol < 2) possibleMoves.push(emptyIndex + 1); // Droite

      // Choisir un mouvement aléatoire parmi les mouvements possibles
      let randomMove =
        possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
      swapTiles(emptyIndex, randomMove);
      emptyIndex = randomMove;
    }
  }

  // Échanger deux carreaux
  function swapTiles(i, j) {
    const temp = tiles[i];
    tiles[i] = tiles[j];
    tiles[j] = temp;
    updatePuzzle();
  }

  // Mettre à jour l'affichage du puzzle
  function updatePuzzle() {
    puzzle.empty();
    tiles.forEach((tile) => puzzle.append(tile));
  }

  // Vérifier si le puzzle est résolu
  function isSolved() {
    for (let i = 0; i < tiles.length - 1; i++) {
      if (tiles[i].data("index") !== i) {
        return false;
      }
    }
    return true;
  }

  // Bouton "Recommencer"
  $("#restartButton").click(function () {
    shuffleTiles();
    $(".message").text("").removeClass("win");
    $("#restartButton").hide();
    $(".tile").click(moveTile); // Réactiver les clics
  });
});
