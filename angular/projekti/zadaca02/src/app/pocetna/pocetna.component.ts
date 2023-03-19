import { Component, OnInit } from '@angular/core';

import { FilmoviI } from '../filmovi-i';
import { ZanroviI } from '../zanrovi-i';

@Component({
  selector: 'app-pocetna',
  templateUrl: './pocetna.component.html',
  styleUrls: ['./pocetna.component.scss'],
})
export class PocetnaComponent implements OnInit {
  genre = new Array<ZanroviI>();
  movie = new Array<FilmoviI>();

  async ngOnInit() {
    let zanrovi = await fetch('/pocetnaDohvatiZanrove');

    this.genre = JSON.parse(await zanrovi.text());

    console.log('this genre' + this.genre[0].naziv);
    for (const zanr of this.genre) {
      let filmovi = await fetch('/pocetnaDajDvaFilma?zanr=' + zanr.naziv);
      let film = JSON.parse(await filmovi.text());

      if (film.length == 0) {
        this.movie.push({ title: '' });
        this.movie.push({ title: '' });
      } else if (film.length == 1) {
        this.movie.push(film[0]);
        this.movie.push({ title: '' });
      } else {
        let prvi = Math.floor(Math.random() * film.length);
        let drugi = Math.floor(Math.random() * film.length);
        while (drugi == prvi) {
          drugi = Math.floor(Math.random() * film.length);
        }
        this.movie.push(film[prvi]);
        this.movie.push(film[drugi]);
      }
    }
  }
}
