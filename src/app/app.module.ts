import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatSliderModule } from '@angular/material';
import { DeleteRowRenderer } from './modules/shared/ag-grid-renderers/delete-row.renderer';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    AppComponent,
    DeleteRowRenderer
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MatSliderModule,
    AgGridModule.withComponents([DeleteRowRenderer])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
