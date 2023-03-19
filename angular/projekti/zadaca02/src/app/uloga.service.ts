import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UlogaService {
  korisnik: any;

  async DohvatiKorisnika() {
    const odgovor = await fetch('/dajUlogu');
    const podaci = await odgovor.json();
    this.korisnik = podaci.korisnik;

    return this.korisnik;
  }
}
