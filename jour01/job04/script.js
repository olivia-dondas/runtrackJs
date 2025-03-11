function bisextile(année) {
  if ((année % 4 === 0 && année % 100 !== 0) || année % 400 === 0) {
    return true;
  } else {
    return false;
  }
}

console.log("L'année 2000 est bissextile ?", bisextile(2000));
console.log("L'année 2020 est bissextile ?", bisextile(2020));
console.log("L'année 2021 est bissextile ?", bisextile(2021));
console.log("L'année 1900 est bissextile ?", bisextile(1900));
