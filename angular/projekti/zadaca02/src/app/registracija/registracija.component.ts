import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.scss'],
})
export class RegistracijaComponent {
  constructor(private router: Router) {}

  async registrirajSe() {
    event?.preventDefault();
    let poruka = document.getElementById('poruka') as HTMLInputElement;
    let korisnicko_ime: string = (
      document.getElementsByName('korime')[0] as HTMLInputElement
    ).value;
    let email: string = (
      document.getElementsByName('email')[0] as HTMLInputElement
    ).value;
    let ime: string = (document.getElementsByName('ime')[0] as HTMLInputElement)
      .value;
    let prezime: string = (
      document.getElementsByName('prezime')[0] as HTMLInputElement
    ).value;
    let lozinka: string = (
      document.getElementsByName('lozinka')[0] as HTMLInputElement
    ).value;

    let regexMail = /\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}/;
    let regexIme = /[a-zA-Z]{2,20}/;
    let regexPrezime = /[a-zA-Z]{2,30}/;
    let regexLozinka = /.{3,20}/;
    let regexKorime = /.{3,20}/;
    const podaci = {
      korisnicko_ime,
      email,
      ime,
      prezime,
      lozinka,
    };
    const postavke = {
      method: 'POST',
      body: JSON.stringify(podaci),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    if (
      regexMail.test(email) &&
      regexIme.test(ime) &&
      regexKorime.test(korisnicko_ime) &&
      regexPrezime.test(prezime) &&
      regexLozinka.test(lozinka)
    ) {
      let korisnik = await fetch('/registracija', postavke);
      console.log('nakon fetcha' + korisnik.status);
      if (korisnik.status == 200) {
        this.router.navigate(['prijava']);
      } else {
        poruka.innerHTML = 'Neuspješna registracija!';
        event?.preventDefault();
      }
    } else {
      poruka.innerHTML = 'Krivo uneseni podaci kod registracije!';
    }
  }

  ngOnInit(): void {}
}
