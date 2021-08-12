import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { FinancialConfiguration } from '../../flow-engine.component';

export interface DialogConfig {
  close: (data: any) => void,
  dialogData: FinancialConfiguration,
  dataSubject$: Subject<any>
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  config: DialogConfig = {
    close: this.onClose.bind(this),
    dialogData: null,
    dataSubject$: null
  }

  componentsList: string[] = [
    'app-mutual-fund'
  ]

  saveChildConfigSubject$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: FinancialConfiguration) {
    this.config.dialogData = dialogData;
    this.config.dataSubject$ = this.saveChildConfigSubject$;
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close(this.config.dialogData);
  }

  onClose(popupData): void {
    this.dialogRef.close(popupData);
  }

  save(): void {
    this.saveChildConfigSubject$.next();
  }
}
