const url = "http://localhost:" + 4202 + "/api";
class FilmoviZanroviPretrazivanje {
  async dohvatiSveZanrove(zahtjev, odgovor) {
    let res = await fetch(url + "/zanr/");

    let podaci = await res.text();
    console.log(podaci + " ovo su podaci");
    let zanrovi = JSON.parse(podaci);

    odgovor.send(zanrovi);
    odgovor.end();
  }

  async dohvatiNasumceFilm(zahtjev, odgovor) {
    let zanrProslijedeni = zahtjev.query.zanr;
    let res = await fetch(url + "/filmovi/zanr/" + zanrProslijedeni);
    let podaci = await res.text();

    let filmovi = JSON.parse(podaci);

    odgovor.send(filmovi);
    odgovor.end();
  }
}

module.exports = FilmoviZanroviPretrazivanje;
