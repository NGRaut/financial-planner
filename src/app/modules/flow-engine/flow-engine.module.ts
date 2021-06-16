import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms'; 
import { MatDialogModule, MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AgGridModule } from 'ag-grid-angular';

import { FlowEngineRoutingModule } from './flow-engine-routing.module';
import { FlowEngineComponent } from './flow-engine.component';
import { DragSourceRenderer } from '../shared/ag-grid-renderers/drag-source.renderer';
import { DoubleClickDirective } from '../shared/directives/double-click.directive';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [FlowEngineComponent, DragSourceRenderer, DoubleClickDirective, DialogComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlowEngineRoutingModule,
    DragDropModule,
    AgGridModule.withComponents([DragSourceRenderer]),
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  entryComponents: [DialogComponent]
})
export class FlowEngineModule { }
