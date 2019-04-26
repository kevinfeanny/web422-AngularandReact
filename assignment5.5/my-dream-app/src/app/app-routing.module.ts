import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponentComponent } from './home-component.component';
import { PositionsComponentComponent } from './positions-component.component';
import { EmployeesComponentComponent } from './employees-component.component';
import { PageNotFoundComponentComponent } from './page-not-found-component.component';
const routes: Routes = [

  { path: 'home', component: HomeComponentComponent },
  { path: 'employees', component: EmployeesComponentComponent },
  { path: 'positions', component: PositionsComponentComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
