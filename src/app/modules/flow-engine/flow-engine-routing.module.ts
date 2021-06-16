import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FlowEngineComponent } from './flow-engine.component';

const routes: Routes = [
  {
    path: '',
    component: FlowEngineComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlowEngineRoutingModule { }
