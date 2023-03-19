import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DokumentacijaComponent } from './dokumentacija/dokumentacija.component';
import { PocetnaComponent } from './pocetna/pocetna.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { ProfilComponent } from './profil/profil.component';
import { RegistracijaComponent } from './registracija/registracija.component';
const routes: Routes = [
  { path: 'pocetna', component: PocetnaComponent },
  { path: 'prijava', component: PrijavaComponent },
  {
    path: 'registracija',
    component: RegistracijaComponent,
  },
  {
    path: 'dokumentacija',
    component: DokumentacijaComponent,
  },
  { path: 'profil', component: ProfilComponent },
  {
    path: '',
    redirectTo: 'pocetna',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
