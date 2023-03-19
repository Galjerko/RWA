import { Component } from '@angular/core';
import { UlogaService } from '../uloga.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent {
  korisnicko_ime?: string;
  email?: string;
  prezime?: string;
  ime?: string;
  uloga?: number;
  constructor(private ulogaServis: UlogaService, private router: Router) {}
  async azuriraj() {
    // event?.preventDefault();
    let ime = this.ime;
    let prezime = this.prezime;
    let korime = this.korisnicko_ime;
    let email = this.email;
    let uloga = this.uloga;
    const podaci = {
      ime,
      prezime,
      korime,
      email,
      uloga,
    };

    const postavke = {
      method: 'PUT',
      body: JSON.stringify(podaci),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let azuriranKorisnik = await fetch('/azuriraj', postavke);
    if (azuriranKorisnik.status == 200) {
      this.router.navigate(['profil']);
    }
  }
  async ngOnInit() {
    this.ulogaServis.DohvatiKorisnika().then(async (korisnik) => {
      this.korisnicko_ime = korisnik.korisnicko_ime;
      this.email = korisnik.email;
      this.ime = korisnik.ime;
      this.prezime = korisnik.prezime;
      this.uloga = korisnik.uloga;
    });
  }
}
