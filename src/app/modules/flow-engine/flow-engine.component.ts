import { CdkDragDrop, CdkDragMove, CdkDragStart, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { DragSourceRenderer } from '../shared/ag-grid-renderers/drag-source.renderer';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { v4 as uuidv4 } from 'uuid';
import { resolve } from 'url';
import { GridOptions } from 'ag-grid-community';

export class MutualFundConfig {
  year: number;
  returnRate: number;
  installment: number;
  totalInvestment: number;
  totalValue: number;
  estimatedReturn: number;
}
export class FinancialConfiguration {
  name: string;
  uuid?: string;
  configuration?: MutualFundConfig
}

@Component({
  selector: 'app-flow-engine',
  templateUrl: './flow-engine.component.html',
  styleUrls: ['./flow-engine.component.scss']
})
export class FlowEngineComponent implements OnInit {

  basket = [
  ];

  leftColumnDefs = [
    { cellRenderer: 'dragSourceCellRenderer', dndSource: true, width: '300px', field: 'name' },
  ];

  financialComponents: FinancialConfiguration[] = [
    { name: 'Mutual Fund (MF)', configuration: null },
    { name: 'Public Provident Fund (PPF)', configuration: null },
    { name: 'Employee Provident Fund (EPF)', configuration: null },
    { name: 'Fixed Deposits', configuration: null },
    { name: 'National Pension Scheme', configuration: null },
    { name: 'Tax Saver Fixed Deposits', configuration: null },
    { name: 'LIC premium', configuration: null },
    { name: 'National Savings Certificate (NSC)', configuration: null },
    { name: 'Senior citizen savings scheme (SCSS)', configuration: null },
    { name: 'Sukanya smriddhi yojana (SSY)', configuration: null },
  ];

  selectedFinancialComponents: FinancialConfiguration[] = [];

  rightColumnDefs = [
    { dndSource: true, width: '300px', field: 'name' },
    { width: '150px', headerName: '', valueGetter: () => 'Configure' },
    { width: '150px', headerName: 'Installment', valueGetter: this.getValue('Installment') },
    { width: '150px', headerName: 'Investment', valueGetter: this.getValue('Investment') },
    { width: '150px', headerName: 'Duration', valueGetter: this.getValue('Duration') },
    { width: '150px', headerName: 'Return Rate', valueGetter: this.getValue('Return Rate') },
    { width: '150px', headerName: 'Estimated Returns', valueGetter: this.getValue('Estimated Returns') },
    { width: '150px', headerName: 'Total Returns', valueGetter: this.getValue('Total Returns') },
    { width: '150px', headerName: 'Liquidity', valueGetter: this.getValue('Liquidity') },
  ];

  private leftGridApi;
  private leftGridColumnApi;
  private rightGridApi;
  private rightGridColumnApi;

  private rowClassRules;
  private defaultColDef;
  private frameworkComponents;

  rightGridOptions: GridOptions = {
    getRowNodeId: function (data) {
      return data.uuid
    },
    rowDragManaged: true,
    animateRows: true,
    rowData: this.selectedFinancialComponents,
    onCellClicked: this.cellClicked.bind(this)
  };

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

  getRowNodeId(data) {
    return data.uuid;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  onLeftGridReady(params) {
    this.leftGridApi = params.api;
    this.leftGridColumnApi = params.columnApi;
  }

  onRightGridReady(params) {
    this.rightGridApi = params.api;
    this.rightGridColumnApi = params.columnApi;
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

    let financialConfig = resolvedData as FinancialConfiguration;
    if (financialConfig) {
      resolvedData.uuid = uuidv4();
      this.basket.push(resolvedData);
      this.selectedFinancialComponents.push(resolvedData);
      this.rightGridApi.setRowData(this.selectedFinancialComponents);
    }
    else {
      console.error('Invalid data supplied to Drag');
    }
  }

  openConfiguration(item) {
    console.log('called', item);
    this.openDialog(item);
  }


  openDialog(item: FinancialConfiguration): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: item,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: FinancialConfiguration) => {
      console.log('The dialog was closed');
      let selectedComponent = this.selectedFinancialComponents.find(a => a.uuid === result.uuid);
      if (selectedComponent) {
        selectedComponent.configuration = result.configuration;
        this.rightGridApi.setRowData(this.selectedFinancialComponents);
      }
    });
  }

  getValue(propName) {
    if (propName === 'Installment')
      return (params) => params.data.configuration && params.data.configuration.installment;
    if (propName === 'Investment')
      return (params) => params.data.configuration && params.data.configuration.totalInvestment;
    if (propName === 'Duration')
      return (params) => params.data.configuration && params.data.configuration.year;
    if (propName === 'Return Rate')
      return (params) => params.data.configuration && params.data.configuration.returnRate;
    if (propName === 'Estimated Returns')
      return (params) => params.data.configuration && params.data.configuration.estimatedReturn;
    if (propName === 'Total Returns')
      return (params) => params.data.configuration && params.data.configuration.totalValue;
    if (propName === 'Liquidity')
      return (params) => params.data.configuration && params.data.configuration.liquidity;
  }

  gridDrop(event, grid) {
    event.preventDefault();

    var userAgent = window.navigator.userAgent;
    var isIE = userAgent.indexOf('Trident/') >= 0;
    var jsonData = event.dataTransfer.getData(isIE ? 'text' : 'application/json');
    var data = JSON.parse(jsonData) as FinancialConfiguration;

    // if data missing or data has no it, do nothing
    if (!data) {
      return;
    }

    // do nothing if row is already in the grid, otherwise we would have duplicates
    var rowAlreadyInGrid = !!this.rightGridApi.getRowNode(data.uuid);
    if (rowAlreadyInGrid) {
      console.log('not adding row to avoid duplicates in the grid');
      return;
    }

    let financialConfig = data as FinancialConfiguration;
    if (financialConfig) {
      data.uuid = uuidv4();
      this.basket.push(data);
      this.selectedFinancialComponents.push(data);
      this.rightGridApi.setRowData(this.selectedFinancialComponents);
    }
    else {
      console.error('Invalid data supplied to Drag');
    }

    // var transaction = {
    //   add: [data]
    // };
    // gridApi.applyTransaction(transaction);
  }


  gridDragOver(event) {
    var dragSupported = event.dataTransfer.types.length;

    if (dragSupported) {
      event.dataTransfer.dropEffect = "copy";
      event.preventDefault();
    }
  }

  cellClicked(params) {
    if (params.value === 'Configure')
      this.openConfiguration(params.data);
  }
}