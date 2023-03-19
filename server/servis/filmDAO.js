const Baza = require("./baza.js");

class FilmDAO {
  constructor() {
    this.baza = new Baza();
  }

  dajSve = async function () {
    this.baza.spojiSeNaBazu();
    let sql = "SELECT * FROM film";
    var podaci = await this.baza.izvrsiUpit(sql, []);
    this.baza.zatvoriVezu();

    return podaci;
  };

  dajSvePremaZanru = async function (zanr) {
    this.baza.spojiSeNaBazu();

    let sql =
      "SELECT * FROM film m JOIN zanr_film zf ON m.id == zf.film_id JOIN zanr z ON zf.zanr_id == z.id WHERE z.naziv =?";

    var podaci = await this.baza.izvrsiUpit(sql, [zanr]);
    this.baza.zatvoriVezu();

    return podaci;
  };

  dajJedan = async function (id) {
    this.baza.spojiSeNaBazu();
    let sql = "SELECT * FROM film WHERE id=?;";
    var podaci = await this.baza.izvrsiUpit(sql, [id]);
    this.baza.zatvoriVezu();
    if (podaci.length == 1) return podaci[0];
    else return null;
  };

  // dajDva = async function (id) {
  //   this.baza.spojiSeNaBazu();
  //   let sql = "SELECT * FROM film WHERE id=?;";
  //   var podaci = await this.baza.izvrsiUpit(sql, [id]);
  //   this.baza.zatvoriVezu();
  //   if (podaci.length == 1) return podaci[0];
  //   else return null;
  // };

  dohvatiKorisnika = async function (id) {
    this.baza.spojiSeNaBazu();
    let sql = "SELECT korisnik_id FROM film WHERE id=?;";
    var podaci = await this.baza.izvrsiUpit(sql, [id]);
    if (podaci.length == 1) return podaci[0];
    else return null;
  };

  azuriraj = async function (id, film) {
    this.baza.spojiSeNaBazu();

    let sql =
      "UPDATE film SET time_of_input=?, approval_status=?, adult=?, backdrop_path=?, budget=?, homepage=?, imdb_id=?, original_language=?, original_title=?, overview=?, popularity=?, poster_path=?, release_date=?, revenue=?, runtime=?, status=?, tagline=?, title=?, vote_average=?,vote_count=? WHERE id=?";
    var sada = new Date().toISOString().slice(0, 19).replace("T", " ");
    let podaci = [
      sada,
      0,
      film.adult,
      film.backdrop_path,
      film.budget,
      film.homepage,
      film.imdb_id,
      film.original_language,
      film.original_title,
      film.overview,
      film.popularity,
      film.poster_path,
      film.release_date,
      film.revenue,
      film.runtime,
      film.status,
      film.tagline,
      film.title,
      film.vote_average,
      film.vote_count,
      id,
    ];
    await this.baza.izvrsiUpit(sql, podaci);
    this.baza.zatvoriVezu();
    return true;
  };

  obrisi = async function (id) {
    this.baza.spojiSeNaBazu();
    let sql = "DELETE FROM film WHERE id=?";
    await this.baza.izvrsiUpit(sql, [id]);
    return true;
  };
}

dodaj = async function (film) {
  this.baza.spojiSeNaBazu();
  let sql =
    "INSERT INTO film (time_of_input, approval_status, adult, backdrop_path, budget, homepage, imdb_id, original_language=, original_title, overview, popularity, poster_path, release_date, revenue, runtime, status, tagline, title, vote_average,vote_count) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
  var sada = new Date().toISOString().slice(0, 19).replace("T", " ");
  let podaci = [
    sada,
    0,
    film.adult,
    film.backdrop_path,
    film.budget,
    film.homepage,
    film.imdb_id,
    film.original_language,
    film.original_title,
    film.overview,
    film.popularity,
    film.poster_path,
    film.release_date,
    film.revenue,
    film.runtime,
    film.status,
    film.tagline,
    film.title,
    film.vote_average,
    film.vote_count,
  ];

  await this.baza.izvrsiUpit(sql, podaci);

  this.baza.zatvoriVezu();
  return true;
};

module.exports = FilmDAO;
