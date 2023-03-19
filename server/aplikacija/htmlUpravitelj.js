const jwt = require("./moduli/jwt.js");

class htmlUpravitelj {
  async registracija(zahtjev, odgovor) {
    if (zahtjev.session.jwt == undefined) {
      if (zahtjev.method == "POST") {
        let tijelo = {
          ime: zahtjev.body.ime,
          prezime: zahtjev.body.prezime,
          lozinka: zahtjev.body.lozinka,
          email: zahtjev.body.email,
          korime: zahtjev.body.korisnicko_ime,
        };
        console.log("ovo je tijelo?" + JSON.stringify(tijelo));
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        let parametri = {
          method: "POST",
          body: JSON.stringify(tijelo),
          headers: zaglavlje,
        };

        let res = await fetch("http://localhost:4202/api/korisnici", parametri);
        if (res.status == 200) {
          odgovor.sendStatus(200);

          return true;
        } else {
          console.log(res.status);
          console.log(await res.text());
          return false;
        }
      }
    } else {
      odgovor.status(403);

      odgovor.redirect("/");
      odgovor.end();
    }
  }

  async dajUlogu(zahtjev, odgovor) {
    if (zahtjev.session !== undefined) {
      const user = zahtjev.session.korisnik;
      if (user != undefined) {
        odgovor.status(200).send({
          korisnik: user,
        });
      }
    }

    if (zahtjev.session.korisnik === undefined) {
      odgovor.status(401);
    }
  }

  async ulogiran(zahtjev, odgovor) {
    if (zahtjev.session != undefined) {
      const ulogirani = zahtjev.session.korisnik;
      if (ulogirani != undefined) {
        odgovor.sendStatus(200);
      } else {
        odgovor.sendStatus(401);
      }
    }
  }
  async odjava(zahtjev, odgovor) {
    zahtjev.session.destroy();

    if (zahtjev.session == null) {
      odgovor.sendStatus(200);
    }
  }

  async azuriraj(zahtjev, odgovor) {
    if (zahtjev.session.jwt != undefined) {
      if (zahtjev.method == "PUT") {
        var korime = zahtjev.body.korime;

        let tijelo = {
          ime: zahtjev.body.ime,
          prezime: zahtjev.body.prezime,
        };

        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        let parametri = {
          method: "PUT",
          body: JSON.stringify(tijelo),
          headers: zaglavlje,
        };
        console.log("tijelo u html" + JSON.stringify(tijelo));

        let res = await fetch(
          "http://localhost:4202/api/korisnici/profil/" + korime,
          parametri
        );
        if (res.status == 200) {
          let jsonKorisnik = JSON.parse(await res.text());
          console.log(JSON.stringify(jsonKorisnik) + " ovo je htmlAzuriranje");
          console.log(JSON.stringify(jsonKorisnik.ime) + " ovo je ime??");
          zahtjev.session.korisnik = {
            ime: zahtjev.body.ime,
            prezime: zahtjev.body.prezime,
            korisnicko_ime: zahtjev.body.korime,
            email: zahtjev.body.email,
            uloga: zahtjev.body.uloga,
          };

          odgovor.sendStatus(200);
          return;
        } else {
          console.log(res.status);
          odgovor.sendStatus(res.status);

          return false;
        }
      }
    } else {
      odgovor.status(403);

      odgovor.end();
      odgovor.redirect("/prijava");
    }
  }

  async prijava(zahtjev, odgovor) {
    if (zahtjev.session.jwt == undefined) {
      if (zahtjev.method == "POST") {
        var korime = zahtjev.body.korisnicko_ime;
        console.log("ovo je korime 82 linija" + korime);
        var lozinka = zahtjev.body.lozinka;

        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        console.log("korime u html" + korime + " " + lozinka);
        let parametri = {
          method: "POST",
          headers: zaglavlje,
        };
        console.log(parametri.body + " ovo je body?");

        let res = await fetch(
          "http://localhost:4202/api/korisnici/" +
            korime +
            "/prijava?lozinka=" +
            lozinka,
          parametri
        );

        if (res.status == 200) {
          let jsonKorisnik = JSON.parse(await res.text());

          zahtjev.session.jwt = jwt.kreirajToken(jsonKorisnik);
          zahtjev.session.korisnik = {
            ime: jsonKorisnik.ime,
            prezime: jsonKorisnik.prezime,
            korisnicko_ime: jsonKorisnik.korisnicko_ime,
            email: jsonKorisnik.email,
            uloga: jsonKorisnik.korisnik_uloga_id,
          };

          console.log("ovo je jwt" + zahtjev.session.jwt);

          odgovor.sendStatus(200);
          return;
        } else {
          console.log("pogresni podaci 401");
          console.log(res.status);
          odgovor.sendStatus(res.status);

          return false;
        }
      }
    } else {
      odgovor.status(403);

      odgovor.end();
      odgovor.redirect("/prijava");
    }
  }
}

module.exports = htmlUpravitelj;
