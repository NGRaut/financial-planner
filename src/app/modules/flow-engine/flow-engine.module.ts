import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';

import { FlowEngineRoutingModule } from './flow-engine-routing.module';
import { FlowEngineComponent } from './flow-engine.component';


@NgModule({
  declarations: [FlowEngineComponent],
  imports: [
    CommonModule,
    FlowEngineRoutingModule,
    DragDropModule
  ]
})
export class FlowEngineModule { }
