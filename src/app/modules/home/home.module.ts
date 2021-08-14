import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FlowEngineModule } from '../flow-engine/flow-engine.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    FlowEngineModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
