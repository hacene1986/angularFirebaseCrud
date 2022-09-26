import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdressListComponent } from './adress-list/adress-list.component';

const routes: Routes = [
  { path: '', component: AdressListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
