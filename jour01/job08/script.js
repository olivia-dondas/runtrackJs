function estPremier(n) {
  for (let i = 2; i < n; i++) {
    if (n % i === 0) return false;
  }
  return n > 1;
}

function sommeNombresPremiers(a, b) {
  return estPremier(a) && estPremier(b) ? a + b : false;
}

console.log(sommeNombresPremiers(3, 5));
console.log(sommeNombresPremiers(4, 5));
console.log(sommeNombresPremiers(7, 11));
console.log(sommeNombresPremiers(9, 13));
