console.clear();
function jourTravaille(date) {
  const joursFeries2024 = [
    "01-01", // Nouvel An
    "04-01", // Lundi de Pâques
    "05-01", // Fête du Travail
    "05-08", // Victoire 1945
    "05-30", // Ascension
    "06-10", // Lundi de Pentecôte
    "07-14", // Fête Nationale
    "08-15", // Assomption
    "11-01", // Toussaint
    "11-11", // Armistice 1918
    "12-25", // Noël
  ];

  const jour = date.getDate().toString().padStart(2, "0");
  const mois = (date.getMonth() + 1).toString().padStart(2, "0");
  const annee = date.getFullYear();

  const dateStr = `${mois}-${jour}`;

  const nomsMois = [
    "janvier",
    "février",
    "mars",
    "avril",
    "mai",
    "juin",
    "juillet",
    "août",
    "septembre",
    "octobre",
    "novembre",
    "décembre",
  ];

  const moisTexte = nomsMois[date.getMonth()];

  if (joursFeries2024.includes(dateStr)) {
    console.log(`Le ${jour} ${moisTexte} ${annee} est un jour férié.`);
  } else if (date.getDay() === 0 || date.getDay() === 6) {
    console.log(`Non, le ${jour} ${moisTexte} ${annee} est un week-end.`);
  } else {
    console.log(`Oui, le ${jour} ${moisTexte} ${annee} est un jour travaillé.`);
  }
}

// Exemple d'utilisation
jourTravaille(new Date(2024, 0, 1)); // 1er janvier 2024 (jour férié)
jourTravaille(new Date(2024, 4, 1)); // 1er mai 2024 (jour férié)
jourTravaille(new Date(2024, 4, 8)); // 8 mai 2024 (jour férié)
jourTravaille(new Date(2024, 4, 30)); // 30 mai 2024 (Ascension, jour férié)
jourTravaille(new Date(2024, 5, 16)); // 16 juin 2024 (dimanche, week-end)
jourTravaille(new Date(2024, 6, 14)); // 14 juillet 2024 (Fête Nationale, jour férié)
jourTravaille(new Date(2024, 7, 15)); // 15 août 2024 (Assomption, jour férié)
jourTravaille(new Date(2024, 10, 1)); // 1er novembre 2024 (Toussaint, jour férié)
jourTravaille(new Date(2024, 10, 11)); // 11 novembre 2024 (Armistice, jour férié)
jourTravaille(new Date(2024, 11, 25)); // 25 décembre 2024 (Noël, jour férié)
jourTravaille(new Date(2024, 5, 15)); // 15 juin 2024 (jour travaillé)
