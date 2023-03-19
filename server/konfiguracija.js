const ds = require("fs/promises");

class Konfiguracija {
  constructor() {
    this.konf = {};
  }

  dajKonf() {
    return this.konf;
  }

  async ucitajSve() {
    var podaci = await ds.readFile(process.argv[2], "UTF-8");
    this.konf = pretvoriJSONkonfig(podaci);
    this.ucitajRest();
    this.ucitajApp();
  }

  async ucitajRest() {
    var podaci = await ds.readFile(process.argv[2], "UTF-8");
    this.konf = pretvoriJSONkonfig(podaci);

    provjeraKljuca(this.konf);
  }

  async ucitajApp() {
    var podaci = await ds.readFile(process.argv[2], "UTF-8");
    this.konf = pretvoriJSONkonfig(podaci);

    provjeraApp(this.konf);
  }
  procitajPortRest() {
    let port = this.konf["rest.port"];

    return port;
  }

  procitajPortApp() {
    let port = this.konf["app.port"];
    return port;
  }
}

function pretvoriJSONkonfig(podaci) {
  let konf = {};
  var nizPodataka = podaci.split("\n");
  for (let podatak of nizPodataka) {
    var podatakNiz = podatak.split("=");
    var naziv = podatakNiz[0];
    var vrijednost = podatakNiz[1];
    konf[naziv] = vrijednost;
  }
  return konf;
}

// function provjeraRest(csvFile) {
//   let regexKorime = new RegExp(
//     /(^(?=.{15,20}$)(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]*[A-Za-z][A-Za-z\d]*$)/
//   );
//   let regexLozinka = new RegExp(
//     /^(?=(.*\d){3})(?=.*[a-zA-Z]{3})(?=(.*[`!@#$%\^&*\-_=\+'\.,]){3})[0-9a-zA-Z`!@#$%\^&*\-_=\+'\.,]{20,100}$/
//   );

//   let korime = csvFile["rest.korime"];
//   let lozinka = csvFile["rest.lozinka"];

//   if (regexKorime.test(korime) == false) {
//     throw "Neispravno rest.korime!";
//   }
//   if (regexLozinka.test(lozinka) == false) {
//     throw "Neispravna rest.lozinka!";
//   }

//   return true;
// }

function provjeraKljuca(csvFile) {
  let apikey3 = csvFile["tmdb.apikey.v3"];
  let apikey4 = csvFile["tmdb.apikey.v4"];
  if (apikey3 == "") {
    throw "Unesite tmdb.apikey.v3";
  }

  if (apikey4 == "") {
    throw "Unesite tmdb.apikey.v4";
  }

  return true;
}

function provjeraApp(csvFile) {
  let stranica = csvFile["app.broj.stranica"];
  if (stranica > 100 || stranica < 5) {
    throw "Neispravan app.broj.stranica!";
  }
  return true;
}

module.exports = Konfiguracija;
