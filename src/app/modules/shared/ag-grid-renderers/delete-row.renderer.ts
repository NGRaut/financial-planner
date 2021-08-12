import { Component, OnDestroy } from '@angular/core';
import { AgRendererComponent, ICellRendererAngularComp } from 'ag-grid-angular';

import { IAfterGuiAttachedParams, ICellRendererComp } from 'ag-grid-community';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'delete-row-renderer',
  template: `<img src="assets/icons/delete-24.png" alt="Delete" (click)="btnClickedHandler($event)" style="cursor:pointer">`,
})
export class DeleteRowRenderer implements ICellRendererAngularComp, OnDestroy {
  private params: any;
  private cellValue: string;

  agInit(params: any): void {
    this.params = params;
    this.cellValue = params.data.uuid;
  }

  refresh(params: ICellRendererParams): boolean {
    this.cellValue = params.data.uuid;
    return true;
  }

  btnClickedHandler() {
    this.params.clicked(this.cellValue);
  }

  ngOnDestroy() {
    // no need to remove the button click handler 
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }
}