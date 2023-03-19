const path = process.env.NODE_PATH;
const konst = require("../konstante.js");
const express = require(path + "express");
const kolacici = require(path + "cookie-parser");
const Konfiguracija = require("../konfiguracija");
const HtmlUpravitelj = require("./htmlUpravitelj.js");
const filmoviPretrazivanje = require("./filmoviPretraga");
const sesija = require(path + "express-session");
let filmoviPretraga = new filmoviPretrazivanje();
let htmlUpravitelj = new HtmlUpravitelj();
const server = express();
let konf = new Konfiguracija();

function pokreniApllikaciju() {
  server.use("/", express.static("./angular"));
}

function putanjePocetna() {
  server.get("/pocetnaDohvatiZanrove", filmoviPretraga.dohvatiSveZanrove);
  server.get("/pocetnaDajDvaFilma", filmoviPretraga.dohvatiNasumceFilm);

  server.post("/registracija", htmlUpravitelj.registracija);
  server.post("/prijava", htmlUpravitelj.prijava);
  server.get("/dajUlogu", htmlUpravitelj.dajUlogu);
  server.get("/Odjava", htmlUpravitelj.odjava);
  server.get("/ulogiran", htmlUpravitelj.ulogiran);
  server.put("/azuriraj", htmlUpravitelj.azuriraj);
}

function pokreniServer() {
  pokreniApllikaciju();
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(kolacici());
  server.use(
    sesija({
      secret: konst.tajniKljucSesija,
      saveUninitialized: true,
      cookie: { maxAge: 1000 * 60 * 60 * 3 },
      resave: false,
    })
  );

  let port = konf.procitajPortApp();
  putanjePocetna();

  server.use((zahtjev, odgovor) => {
    odgovor.status(404);
    var poruka = { greska: "Stranica nije pronađena!" };
    odgovor.send(JSON.stringify(poruka));
  });

  server.listen(port, () => {
    console.log(`Server pokrenut na portu: ${port}`);
  });
}

konf
  .ucitajApp()
  .then(pokreniServer)
  .catch((greska) => {
    console.log(greska);
    if (process.argv.length == 2)
      console.error("Potrebno je unjeti naziv datoteke!");
    else if (greska.path)
      console.error("Naziv datoteke nije dobar: " + greska.path);

    process.exit();
  });
