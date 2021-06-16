import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AgGridModule } from 'ag-grid-angular';

import { FlowEngineRoutingModule } from './flow-engine-routing.module';
import { FlowEngineComponent } from './flow-engine.component';
import { DragSourceRenderer } from '../shared/ag-grid-renderers/drag-source.renderer';

@NgModule({
  declarations: [FlowEngineComponent, DragSourceRenderer],
  imports: [
    CommonModule,
    FlowEngineRoutingModule,
    DragDropModule,
    AgGridModule.withComponents([DragSourceRenderer])
  ]
})
export class FlowEngineModule { }
