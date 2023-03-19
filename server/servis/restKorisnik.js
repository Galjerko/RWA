const KorisnikDAO = require("./korisnikDAO.js");
const konfig = require("../konfiguracija.js");
const greske = require("./greske.js");
const jwt = require("./moduli/jwt.js");
const kodovi = require("./moduli/kodovi.js");
exports.getKorisnici = async function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let kdao = new KorisnikDAO();

  kdao
    .dajSve()
    .then((korisnici) => {
      odgovor.send(JSON.stringify(korisnici));
    })
    .catch((greska) => {
      odgovor.json(greska);
    });
};

exports.postKorisnici = function (zahtjev, odgovor) {
  odgovor.type("application/json");

  zahtjev.body.lozinka = kodovi.kreirajSHA256(
    zahtjev.body.lozinka,
    zahtjev.body.korime
  );

  let podaci = zahtjev.body;

  let kdao = new KorisnikDAO();
  kdao
    .dodaj(podaci)
    .then((poruka) => {
      odgovor.send(JSON.stringify(poruka));
    })
    .catch((greska) => {
      odgovor.json(greska);
    });
};

exports.deleteKorisnici = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(501);
  let poruka = { greska: "metoda nije implementirana" };
  odgovor.send(JSON.stringify(poruka));
};

exports.putKorisnici = function (zahtjev, odgovor) {};

exports.getKorisnik = async function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let kdao = new KorisnikDAO();
  let korime = zahtjev.params.korime;

  kdao
    .daj(korime)
    .then((korisnik) => {
      odgovor.send(JSON.stringify(korisnik));
    })
    .catch((greska) => {
      odgovor.json(greska);
    });
};

exports.getKorisnikPrijava = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let kdao = new KorisnikDAO();
  let korime = zahtjev.params.korime;

  let lozinka = kodovi.kreirajSHA256(zahtjev.query.lozinka, korime);

  kdao.daj(korime).then((korisnik) => {
    if (korisnik != null && korisnik.lozinka == lozinka) {
      odgovor.send(JSON.stringify(korisnik));
    } else {
      odgovor.status(401);
      odgovor.send(JSON.stringify({ greska: "Krivi podaci!" }));
    }
  });
};

exports.postKorisnik = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(405);
  let poruka = { greska: "metoda nije dopuštena" };
  odgovor.send(JSON.stringify(poruka));
};

exports.deleteKorisnik = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(501);
  let poruka = { greska: "metoda nije implementirana" };
  odgovor.send(JSON.stringify(poruka));
};

exports.putKorisnik = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let korime = zahtjev.params.korime;
  let podaci = zahtjev.body;
  let kdao = new KorisnikDAO();
  kdao
    .azuriraj(korime, podaci)
    .then((poruka) => {
      odgovor.send(JSON.stringify(poruka));
    })
    .catch((greska) => {
      odgovor.json(greska);
    });
};

exports.putProfil = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let korime = zahtjev.params.korime;
  let podaci = zahtjev.body;

  let kdao = new KorisnikDAO();
  kdao
    .azurirajProfil(korime, podaci)
    .then((poruka) => {
      odgovor.send(JSON.stringify(poruka));
    })
    .catch((greska) => {
      odgovor.json(greska);
    });
};

exports.postKorisnikAktivacija = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(405);
  let poruka = { greska: "metoda nije dopuštena" };
  odgovor.send(JSON.stringify(poruka));
};

exports.putKorisnikAktivacija = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let korime = zahtjev.params.korime;
  let podaci = zahtjev.body.aktivacijskiKod;

  let kdao = new KorisnikDAO();
  kdao
    .aktiviraj(korime, podaci)
    .then((poruka) => {
      odgovor.send(JSON.stringify(poruka));
    })
    .catch((greska) => {
      odgovor.json(greska);
    });
};
