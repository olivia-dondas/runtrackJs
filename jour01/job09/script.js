function tri(numbers, order) {
  if (order === "asc") {
    // Tri ascendant
    numbers.sort((a, b) => a - b);
  } else if (order === "desc") {
    // Tri descendant
    numbers.sort((a, b) => b - a);
  } else {
    // Si l'ordre n'est ni "asc" ni "desc", on peut choisir de ne pas trier ou de lancer une erreur
    console.error("L'ordre doit être 'asc' ou 'desc'.");
  }
  return numbers;
}

// Exemples d'utilisation
const numbers = [8, 3, 4, 1, 0, 9, 2, 6, 7, 5];

console.log(tri(numbers, "asc"));
console.log(tri(numbers, "desc"));
