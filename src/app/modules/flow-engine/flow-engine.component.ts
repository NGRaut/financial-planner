import { CdkDragDrop, CdkDragMove, CdkDragStart, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { DragSourceRenderer } from '../shared/ag-grid-renderers/drag-source.renderer';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';

export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-flow-engine',
  templateUrl: './flow-engine.component.html',
  styleUrls: ['./flow-engine.component.scss']
})
export class FlowEngineComponent implements OnInit {

  items = [
    'Mutual Fund (MF)',
    'Public Provident Fund (PPF)',
    'Employee Provident Fund (EPF)',
    'Fixed Deposits',
    'National Pension Scheme',
    'Tax Saver Fixed Deposits',
    'LIC premium',
    'National Savings Certificate (NSC)',
    'Senior citizen savings scheme (SCSS)',
    'Sukanya smriddhi yojana (SSY)'
  ];

  basket = [
  ];

  columnDefs = [
    { cellRenderer: 'dragSourceCellRenderer', dndSource: true, width: '300px', field: 'make' },
  ];

  rowData = [
    { make: 'Mutual Fund (MF)', },
    { make: 'Public Provident Fund (PPF)', },
    { make: 'Employee Provident Fund (EPF)', },
    { make: 'Fixed Deposits', },
    { make: 'National Pension Scheme', },
    { make: 'Tax Saver Fixed Deposits', },
    { make: 'LIC premium', },
    { make: 'National Savings Certificate (NSC)', },
    { make: 'Senior citizen savings scheme (SCSS)', },
    { make: 'Sukanya smriddhi yojana (SSY)' },
  ];

  private gridApi;
  private gridColumnApi;

  private rowClassRules;
  private defaultColDef;
  private frameworkComponents;

  animal: string;
  name: string;

  constructor(public dialog: MatDialog) {
    this.defaultColDef = {
      width: 80,
      sortable: true,
      filter: true,
      resizable: true,
    };
    this.frameworkComponents = { dragSourceCellRenderer: DragSourceRenderer };
  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  onDragOver(event) {
    var dragSupported = event.dataTransfer.length;
    if (dragSupported) {
      event.dataTransfer.dropEffect = 'move';
    }
    event.preventDefault();
  }

  onDrop(event) {
    var userAgent = window.navigator.userAgent;
    var isIE = userAgent.indexOf('Trident/') >= 0;
    var jsonData = event.dataTransfer.getData(isIE ? 'text' : 'application/json');
    event.preventDefault();
    var resolvedData = jsonData;
    if (jsonData.constructor === "".constructor) {
      resolvedData = JSON.parse(jsonData);
    }

    if (resolvedData.constructor === ({}).constructor) {
      this.basket.push(resolvedData);
    }
    else {
      console.error('Invalid data supplied to Drag');
    }
  }

  openConfiguration(item) {
    console.log('called', item);
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }
}