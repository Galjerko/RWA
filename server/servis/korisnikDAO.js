const Baza = require("./baza.js");

class KorisnikDAO {
  constructor() {
    this.baza = new Baza();
  }

  dajSve = async function () {
    this.baza.spojiSeNaBazu();
    let sql = "SELECT * FROM korisnik;";
    var podaci = await this.baza.izvrsiUpit(sql, []);
    this.baza.zatvoriVezu();
    return podaci;
  };

  daj = async function (korime) {
    this.baza.spojiSeNaBazu();
    let sql = "SELECT * FROM korisnik WHERE korisnicko_ime=?;";
    var podaci = await this.baza.izvrsiUpit(sql, [korime]);
    this.baza.zatvoriVezu();
    if (podaci.length == 1) return podaci[0];
    else return null;
  };

  dodaj = async function (korisnik) {
    this.baza.spojiSeNaBazu();
    let sql = `INSERT INTO korisnik (ime,prezime,lozinka,email,korisnicko_ime,korisnik_uloga_id, aktiviran) VALUES (?,?,?,?,?,?,?)`;

    let podaci = [
      korisnik.ime,
      korisnik.prezime,
      korisnik.lozinka,
      korisnik.email,
      korisnik.korime,
      1,
      1,
    ];

    await this.baza.izvrsiUpit(sql, podaci);
    this.baza.zatvoriVezu();
    return true;
  };

  dohvatiId = async function (korime) {
    this.baza.spojiSeNaBazu();
    let sql = "SELECT id FROM korisnik WHERE korisnicko_ime=?";
    var podaci = await this.baza.izvrsiUpit(sql, [korime]);
    return podaci[0];
  };

  obrisi = async function (korime) {
    this.baza.spojiSeNaBazu();
    let sql = "DELETE FROM korisnik WHERE korisnicko_ime=?";
    await this.baza.izvrsiUpit(sql, [korime]);
    return true;
  };

  azuriraj = async function (korime, korisnik) {
    this.baza.spojiSeNaBazu();
    let sql =
      "UPDATE korisnik SET ime=?, prezime=?, lozinka=?, email=? WHERE id=?";
    let id = await this.dohvatiId(korime);
    let podaci = [
      korisnik.ime,
      korisnik.prezime,
      korisnik.lozinka,
      korisnik.email,
      id.id,
    ];
    await this.baza.izvrsiUpit(sql, podaci);
    this.baza.zatvoriVezu();
    return true;
  };

  azurirajProfil = async function (korime, korisnik) {
    this.baza.spojiSeNaBazu();

    let sql = "UPDATE korisnik SET ime=?, prezime=? WHERE id=?";
    let id = await this.dohvatiId(korime);

    let podaci = [korisnik.ime, korisnik.prezime, id.id];

    await this.baza.izvrsiUpit(sql, podaci);

    this.baza.zatvoriVezu();
    return true;
  };

  aktiviraj = async function (korime, kod) {
    this.baza.spojiSeNaBazu();
    let tekst = "uspjesno aktiviran racun";
    let sql =
      "UPDATE korisnik SET aktiviran=1 WHERE korisnicko_ime=? AND reg_token=?";
    let podaci = [[korime], [kod]];
    await this.baza.izvrsiUpit(sql, podaci);
    this.baza.zatvoriVezu();
    return tekst;
  };
}

module.exports = KorisnikDAO;
