import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AgGridModule } from 'ag-grid-angular';

import { FlowEngineRoutingModule } from './flow-engine-routing.module';
import { FlowEngineComponent } from './flow-engine.component';
import { DragSourceRenderer } from '../shared/ag-grid-renderers/drag-source.renderer';
import { DoubleClickDirective } from '../shared/directives/double-click.directive';

@NgModule({
  declarations: [FlowEngineComponent, DragSourceRenderer, DoubleClickDirective],
  imports: [
    CommonModule,
    FlowEngineRoutingModule,
    DragDropModule,
    AgGridModule.withComponents([DragSourceRenderer])
  ]
})
export class FlowEngineModule { }
