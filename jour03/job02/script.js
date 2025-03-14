$(document).ready(function () {
  // Mélanger les images
  $("#shufflebutton").click(function () {
    var unsortedRainbow = $("#unsortedRainbow");
    var images = unsortedRainbow.children().toArray();

    // Mélanger les images de manière aléatoire
    while (images.length) {
      unsortedRainbow.append(
        images.splice(Math.floor(Math.random() * images.length), 1)[0]
      );
    }

    // Effacer le message après avoir mélangé
    $(".message").text("");
  });

  // Vérifier l'ordre des images
  $("#checkOrderButton").click(function () {
    var correctOrder = true;
    $("#unsortedRainbow img").each(function (index) {
      if ($(this).data("order") !== index + 1) {
        correctOrder = false;
        return false; // Sortir de la boucle si l'ordre est incorrect
      }
    });

    if (correctOrder) {
      $(".message").text("Vous avez gagné").removeClass("lose").addClass("win");
    } else {
      $(".message").text("Vous avez perdu").removeClass("win").addClass("lose");
    }
  });
});
