const Baza = require("./baza.js");

class ZanrDAO {
  constructor() {
    this.baza = new Baza();
  }

  dajSve = async function () {
    this.baza.spojiSeNaBazu();
    let sql = "SELECT * FROM zanr;";
    var podaci = await this.baza.izvrsiUpit(sql, []);
    this.baza.zatvoriVezu();

    return podaci;
  };
  dajJedan = async function (id) {
    this.baza.spojiSeNaBazu();
    let sql = "SELECT * FROM zanr WHERE id=?;";
    var podaci = await this.baza.izvrsiUpit(sql, [id]);
    this.baza.zatvoriVezu();
    if (podaci.length == 1) return podaci[0];
    else return null;
  };

  dodaj = async function (zanr) {
    this.baza.spojiSeNaBazu();
    let sql = `INSERT INTO zanr (naziv) VALUES (?)`;
    let podaci = [zanr.naziv];

    await this.baza.izvrsiUpit(sql, podaci);
    return true;
  };

  obrisiJedan = async function (id) {
    this.baza.spojiSeNaBazu();
    let sql = "DELETE FROM zanr WHERE id=?";
    await this.baza.izvrsiUpit(sql, [id]);
    return true;
  };

  obrisiOstale = async function () {
    this.baza.spojiSeNaBazu();
    let sql =
      "DELETE FROM zanr WHERE id NOT IN (SELECT f.zanr_id FROM zanr_film f)";
    await this.baza.izvrsiUpit(sql, []);
    return true;
  };

  azuriraj = async function (id, zanr) {
    this.baza.spojiSeNaBazu();
    let sql = "UPDATE zanr SET naziv=? WHERE id=?";
    let podaci = [zanr.naziv, id];
    await this.baza.izvrsiUpit(sql, podaci);
    this.baza.zatvoriVezu();
    return true;
  };

  dohvatiId = async function (zanr) {
    this.baza.spojiSeNaBazu();
    let sql = "SELECT id FROM zanr WHERE naziv=?";
    var podaci = await this.baza.izvrsiUpit(sql, [zanr.naziv]);
    return podaci[0];
  };
}

module.exports = ZanrDAO;
