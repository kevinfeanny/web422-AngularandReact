import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponentComponent } from './nav-component.component';
import { ContentComponentComponent } from './content-component.component';
import { FooterComponentComponent } from './footer-component.component';
import { HomeComponentComponent } from './home-component.component';
import { EmployeesComponentComponent } from './employees-component.component';
import { PositionsComponentComponent } from './positions-component.component';
import { PageNotFoundComponentComponent } from './page-not-found-component.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponentComponent,
    ContentComponentComponent,
    FooterComponentComponent,
    HomeComponentComponent,
    EmployeesComponentComponent,
    PositionsComponentComponent,
    PageNotFoundComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
