function jsonValueKey(jsonString, key) {
  try {
    let obj = JSON.parse(jsonString); // Convertit la chaîne JSON en objet JS
    return obj[key] || "Clé non trouvée"; // Retourne la valeur ou un message si la clé n'existe pas
  } catch (error) {
    return "JSON invalide"; // Message d'erreur si la chaîne JSON est mal formée
  }
}

let jsonString =
  '{"name": "Olive", "age": 34, "city": "Marseille", "country": "France", "color": "bleu"}';

console.log(jsonValueKey(jsonString, "city")); // Affiche: Marseille
console.log(jsonValueKey(jsonString, "name")); // Affiche: Olive
console.log(jsonValueKey(jsonString, "country")); // Affiche: Clé non trouvée
console.log(jsonValueKey(jsonString, "color")); // Affiche: JSON invalide
