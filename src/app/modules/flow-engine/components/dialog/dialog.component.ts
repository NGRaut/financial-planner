import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FinancialConfiguration } from '../../flow-engine.component';

export interface DialogConfig {
  close: (data: any) => void,
  dialogData: FinancialConfiguration
}
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  config: DialogConfig = {
    close: this.onClose.bind(this),
    dialogData: null
  }

  componentsList: string[] = [
    'app-mutual-fund'
  ]

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: FinancialConfiguration) {
      this.config.dialogData = dialogData;
    }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onClose(popupData): void {
    this.dialogRef.close(popupData);
  }
}
