import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss'],
})
export class PrijavaComponent {
  constructor(private router: Router) {}
  async prijaviSe() {
    event?.preventDefault();
    let poruka = document.getElementById('poruka') as HTMLInputElement;
    let korisnicko_ime: string = (
      document.getElementsByName('korime')[0] as HTMLInputElement
    ).value;
    let lozinka: string = (
      document.getElementsByName('lozinka')[0] as HTMLInputElement
    ).value;

    const podaci = {
      korisnicko_ime,
      lozinka,
    };

    const postavke = {
      method: 'POST',
      body: JSON.stringify(podaci),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    let korisnik = await fetch('/prijava', postavke);

    if (korisnik.status == 200) {
      this.router.navigate(['/']);
    } else {
      poruka.innerHTML = 'Pogrešni podaci';
    }
  }
}
