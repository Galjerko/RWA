const konst = require("../konstante.js");
const path = process.env.NODE_PATH;
const cors = require(path + "cors");

const express = require(path + "express");
const Konfiguracija = require("../konfiguracija");
const restKorisnici = require("./restKorisnik.js");
const RestTMDB = require("./restTMDB");
const restZanrovi = require("./restZanr.js");
const restFilmovi = require("./restFilm.js");

const server = express();
const greske = require("./greske.js");
let konf = new Konfiguracija();

function pokreniServer() {
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(cors());
  let port = konf.procitajPortRest();

  pripremiPutanjeKorisnik();
  pripremiPutanjeTMDB();
  pripremiZanrove();
  pripremiPutanjeFilmovi();

  server.use((zahtjev, odgovor) => {
    odgovor.status(404);
    let poruka = { greska: "Stranica nije pronađena!" };
    odgovor.json(poruka);
  });

  server.listen(port, () => {
    console.log(`Server pokrenut na portu: ${port}`);
  });
}

konf
  .ucitajRest()
  .then(pokreniServer)
  .catch((greska) => {
    if (process.argv.length == 2)
      console.error("Potrebno je unjeti naziv datoteke!");
    else if (greska.path)
      console.error("Naziv datoteke nije dobar: " + greska.path);
    else console.error(greska);

    process.exit();
  });

function pripremiPutanjeKorisnik() {
  server.get("/api/korisnici", restKorisnici.getKorisnici);
  server.post("/api/korisnici", restKorisnici.postKorisnici);
  server.put("/api/korisnici", greske.greska501);
  server.delete("/api/korisnici", greske.greska501);

  server.get("/api/korisnici/:korime", restKorisnici.getKorisnik);
  server.post("/api/korisnici/:korime", restKorisnici.postKorisnik);
  server.put("/api/korisnici/:korime", restKorisnici.putKorisnik);
  server.delete("/api/korisnici/:korime", greske.greska501);

  server.put("/api/korisnici/profil/:korime", restKorisnici.putProfil);

  server.get("/api/korisnici/:korime/prijava", greske.greska501);
  server.post(
    "/api/korisnici/:korime/prijava",
    restKorisnici.getKorisnikPrijava
  );

  server.put("/api/korisnici/:korime/prijava", greske.greska501);
  server.delete("/api/korisnici/:korime/prijava", greske.greska501);

  server.get("/api/korisnici/:korime/aktivacija", greske.greska501);
  server.post(
    "/api/korisnici/:korime/aktivacija",
    restKorisnici.postKorisnikAktivacija
  );
  server.put(
    "/api/korisnici/:korime/aktivacija",
    restKorisnici.putKorisnikAktivacija
  );
  server.delete("/api/korisnici/:korime/aktivacija", greske.greska501);
}

function pripremiPutanjeTMDB() {
  let restTMDB = new RestTMDB(konf.dajKonf()["tmdb.apikey.v3"]);
  server.get("/api/tmdb/zanr", restTMDB.getZanr.bind(restTMDB));
  server.get("/api/tmdb/filmovi", restTMDB.getFilmovi.bind(restTMDB));
}

function pripremiZanrove() {
  server.get("/api/zanr/", restZanrovi.getZanrovi);
  server.post("/api/zanr/", restZanrovi.postZanrovi);
  server.put("/api/zanr/", greske.greska501);
  server.delete("/api/zanr/", restZanrovi.deleteZanrovi);

  server.get("/api/zanr/:id", restZanrovi.getZanr);
  server.post("/api/zanr/:id", restZanrovi.postZanr);
  server.put("/api/zanr/:id", restZanrovi.putZanr);
  server.delete("/api/zanr/:id", restZanrovi.deleteZanr);
}

function pripremiPutanjeFilmovi() {
  server.get("/api/filmovi/:id", restFilmovi.getFilm);
  server.post("/api/filmovi/:id", restFilmovi.postFilm);
  server.put("/api/filmovi/:id", restFilmovi.putFilm);
  server.delete("/api/filmovi/:id", restFilmovi.deleteFilm);

  server.get("/api/filmovi", restFilmovi.dohvatiFilmove);
  server.post("api/filmovi", restFilmovi.dodajFilm);

  server.get("/api/filmovi/zanr/:zanr", restFilmovi.dajFilmZanr);
}
