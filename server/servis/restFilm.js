const FilmDAO = require("./filmDAO.js");

exports.getFilm = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let fdao = new FilmDAO();
  let id = zahtjev.params.id;
  fdao.dajJedan(id).then((poruka) => {
    console.log(poruka);
    odgovor.send(JSON.stringify(poruka));
  });
};
exports.dajFilmZanr = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let fdao = new FilmDAO();
  let zanr = zahtjev.params.zanr;

  fdao.dajSvePremaZanru(zanr).then((poruka) => {
    console.log(poruka);
    odgovor.send(JSON.stringify(poruka));
  });
};

exports.postFilm = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(405);
  let poruka = { greska: "metoda nije dopuštena" };
  odgovor.send(JSON.stringify(poruka));
};

exports.putFilm = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let fdao = new FilmDAO();
  let id = zahtjev.params.id;
  let film = zahtjev.body;

  fdao.azuriraj(id, film).then((poruka) => {
    odgovor.send(JSON.stringify(poruka));
  });
};

exports.deleteFilm = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let fdao = new FilmDAO();
  let id = zahtjev.params.id;
  fdao.obrisi(id).then((poruka) => {
    odgovor.send(JSON.stringify(poruka));
  });
};

exports.dodajFilm = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let fdao = new FilmDAO();
  let film = zahtjev.body;

  fdao.dodaj(film).then((poruka) => {
    odgovor.send(Json.stringify(poruka));
  });
};

exports.greska501 = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(501);
  let poruka = { greska: "metoda nije implementirana" };
  odgovor.send(JSON.stringify(poruka));
};

exports.dohvatiFilmove = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let fdao = new FilmDAO();
  fdao
    .dajSve()
    .then((filmovi) => {
      odgovor.send(JSON.stringify(filmovi));
    })
    .catch((greska) => {
      odgovor.json(greska);
    });
};
