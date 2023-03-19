import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { UlogaService } from './uloga.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'zadaca02';

  uloga: any = 0;

  constructor(
    private ulogaServis: UlogaService,

    private router: Router
  ) {}

  async odjava() {
    let odjava = await fetch('/Odjava');
    if (odjava.status == 200) {
      this.uloga = 0;
      this.router.navigate(['prijava']);
    }
  }

  async ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.ulogaServis.DohvatiKorisnika().then(async (korisnik) => {
          let ulogiran = await fetch('/ulogiran');

          if (ulogiran.status == 200) {
            this.uloga = korisnik.uloga;
          } else {
            this.uloga = 0;
          }
        });
      }
    });
  }
}
