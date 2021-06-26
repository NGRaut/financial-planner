import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatInputModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AgGridModule } from 'ag-grid-angular';

import { FlowEngineRoutingModule } from './flow-engine-routing.module';
import { FlowEngineComponent } from './flow-engine.component';
import { DragSourceRenderer } from '../shared/ag-grid-renderers/drag-source.renderer';
import { DialogComponent } from './components/dialog/dialog.component';
import { MutualFundComponent } from './components/mutual-fund/mutual-fund.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatSliderModule } from '@angular/material';

@NgModule({
  declarations: [FlowEngineComponent, DragSourceRenderer, DialogComponent,
    MutualFundComponent],
  imports: [
    CommonModule,
    FormsModule,
    FlowEngineRoutingModule,
    DragDropModule,
    AgGridModule.withComponents([DragSourceRenderer]),
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatSliderModule
  ],
  entryComponents: [DialogComponent]
})
export class FlowEngineModule { }
