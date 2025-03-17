document.addEventListener("DOMContentLoaded", function () {
  // Fonction pour charger le fichier JSON
  async function loadJSON(filePath) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Erreur lors du chargement du fichier JSON :", error);
    }
  }

  // Fonction pour remplir le tableau HTML avec les données JSON
  function populateTable(data) {
    const tableBody = document.querySelector("#utilisateur-table tbody");

    // Parcourt chaque objet utilisateur dans le JSON
    data.forEach((item) => {
      const utilisateur = item.utilisateur; // Accède à l'objet utilisateur
      const row = document.createElement("tr");

      row.innerHTML = `
          <td>${utilisateur.id}</td>
          <td>${utilisateur.nom}</td>
          <td>${utilisateur.prenom}</td>
          <td>${utilisateur.email}</td>
        `;

      tableBody.appendChild(row);
    });
  }

  // Charger et afficher les données JSON dans le tableau
  loadJSON("utilisateur.json").then((data) => {
    if (data) populateTable(data); // Remplit le tableau si les données sont chargées avec succès
  });
});
