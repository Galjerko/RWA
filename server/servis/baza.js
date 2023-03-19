const sqlite3 = require("sqlite3").verbose();

let bp;

class Baza {
  spojiSeNaBazu() {
    bp = new sqlite3.Database("../baza.sqlite");
    bp.exec("PRAGMA foreign_keys = ON;");
  }

  izvrsiUpit(sql, podaciZaSQL, povratnaFunkcija) {
    bp.all(sql, podaciZaSQL, povratnaFunkcija);
  }

  izvrsiUpit(sql, podaciZaSQL) {
    return new Promise((uspjeh, neuspjeh) => {
      bp.all(sql, podaciZaSQL, (greska, rezultat) => {
        if (greska) neuspjeh(greska);
        else uspjeh(rezultat);
      });
    });
  }

  zatvoriVezu() {
    bp.close();
  }
}

module.exports = Baza;
