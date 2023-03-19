exports.greska501 = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(501);
  let poruka = { greska: "Metoda nije implementirana!" };
  odgovor.send(JSON.stringify(poruka));
};

exports.greska400 = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(400);
  let poruka = { greska: "Nevaljali zahtjev!" };
  odgovor.send(JSON.stringify(poruka));
};

exports.greska417 = function (zahtjev, odgovor) {
  odgovor.type("application/json");
  odgovor.status(417);
  let poruka = { greska: "Neočekivani podaci!" };
  odgovor.send(JSON.stringify(poruka));
};

exports.greska401 = function (zahtjev, odgovor) {
  console.log(odgovor + " ovo je odg");
  odgovor.type("application/json");
  odgovor.status(401);
  let poruka = { greska: "Neautoriziran pristup" };
  odgovor.send(JSON.stringify(poruka));
};
