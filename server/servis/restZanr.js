const ZanrDAO = require("./zanrDAO.js");

exports.getZanrovi = function (zahtjev, odgovor) {
  odgovor.type("application/json");

  let zdao = new ZanrDAO();

  zdao.dajSve().then((zanrovi) => {
    odgovor.send(JSON.stringify(zanrovi));
  });
};

exports.postZanrovi = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let podaci = zahtjev.body;
  let zdao = new ZanrDAO();
  zdao.dodaj(podaci).then((poruka) => {
    odgovor.send(JSON.stringify(poruka));
  });
};

exports.deleteZanrovi = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let zdao = new ZanrDAO();
  zdao.obrisiOstale().then((poruka) => {
    odgovor.send(JSON.stringify(poruka));
  });
};

exports.getZanr = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let zdao = new ZanrDAO();
  let id = zahtjev.params.id;
  zdao.dajJedan(id).then((poruka) => {
    odgovor.send(JSON.stringify(poruka));
  });
};

exports.postZanr = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(405);
  let poruka = { greska: "metoda nije dopuštena" };
  odgovor.send(JSON.stringify(poruka));
};

exports.putZanr = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let zdao = new ZanrDAO();
  let id = zahtjev.params.id;
  let zanr = zahtjev.body;
  zdao.azuriraj(id, zanr).then((poruka) => {
    odgovor.send(JSON.stringify(poruka));
  });
};

exports.deleteZanr = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  let zdao = new ZanrDAO();
  let id = zahtjev.params.id;
  zdao.obrisiJedan(id).then((poruka) => {
    odgovor.send(JSON.stringify(poruka));
  });
};
