import { CdkDragDrop, CdkDragMove, CdkDragStart, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, Inject, OnInit } from '@angular/core';
import { DragSourceRenderer } from '../shared/ag-grid-renderers/drag-source.renderer';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { v4 as uuidv4 } from 'uuid';
import { resolve } from 'url';
import { GridOptions } from 'ag-grid-community';

export class MutualFundConfig {
  year?: number;
  returnRate?: number;
  installment?: number = 0;
  totalInvestment?: number;
  totalValue?: number;
  estimatedReturn?: number;
}
export class FinancialConfiguration {
  name: string;
  uuid?: string;
  configuration?: MutualFundConfig;
}

export class FinancialConfigurationTracker {
  name: string;
  uuid?: string;
  configuration?: MutualFundConfig;
  saved?: boolean
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
    { dndSource: true, width: '200px', field: 'name' },
    { width: '150px', headerName: '', valueGetter: () => 'Configure', cellClass: ['cursor-pointer'] },
    { width: '150px', headerName: 'Installment', valueGetter: this.getValue('Installment') },
    { width: '160px', headerName: 'Duration (years)', valueGetter: this.getValue('Duration') },
    { width: '150px', headerName: 'Investment', valueGetter: this.getValue('Investment') },
    { width: '150px', headerName: 'Return Rate (%)', valueGetter: this.getValue('Return Rate') },
    { width: '170px', headerName: 'Estimated Returns', valueGetter: this.getValue('Estimated Returns') },
    { width: '150px', headerName: 'Total Returns', valueGetter: this.getValue('Total Returns') },
    { width: '150px', headerName: 'Liquidity', valueGetter: this.getValue('Liquidity') },
  ];

  bottomColumnDefs = [
    { dndSource: true, width: '200px', valueGetter: () => 'Total' },
    { width: '150px', headerName: 'Installments', field: 'installment' },
    { width: '150px', headerName: 'Investment', field: 'totalInvestment' },
    { width: '170px', headerName: 'Estimated Returns', field: 'estimatedReturn' },
    { width: '150px', headerName: 'Total Returns', field: 'totalValue' },
    { width: '150px', headerName: 'Liquidity', field: 'liquidity' },
  ];

  bottomData = []

  private leftGridApi;
  private leftGridColumnApi;
  private rightGridApi;
  private rightGridColumnApi;
  private bottomRightGridApi;
  private bottomRightGridColumnApi;

  private rowClassRules;
  private defaultColDef;
  private frameworkComponents = { dragSourceCellRenderer: DragSourceRenderer };

  noRowsTemplate: string = `<div style="display:flex">
    <img src="assets/icons/drag-64.png" alt="Drag and drop">
    <ol id="steps" style="text-align: left; font-size:14px">
      <li>Drag any Financial component from sidebar to here</li>
      <li>Click Configure and enter your desired investment details and click Save</li>
      <li>Then you can see summarized return details.</li>
    </ol>
  </div>`;

  topRightGridOptions: GridOptions = {
    alignedGrids: [],
    getRowNodeId: function (data) {
      return data.uuid
    },
    rowDragManaged: true,
    animateRows: true,
    rowData: this.selectedFinancialComponents,
    onCellClicked: this.cellClicked.bind(this),
    defaultColDef: {
      width: 80,
      sortable: true,
      filter: true,
      resizable: true,
    },
    frameworkComponents: this.frameworkComponents,
    onGridReady: this.onRightGridReady.bind(this),
    overlayNoRowsTemplate: this.noRowsTemplate,
    onRowDataChanged: this.rowDataChanged.bind(this)
  };

  bottomRightGridOptions: GridOptions = {
    alignedGrids: [],
    rowDragManaged: true,
    animateRows: true,
    rowData: this.bottomData,
    defaultColDef: {
      width: 80,
      sortable: true,
      filter: true,
      resizable: true,
    },
    onGridReady: this.onBottomRightGridReady.bind(this)
  };

  hasOneItemSaved: boolean = false;

  constructor(public dialog: MatDialog) {
    this.topRightGridOptions.alignedGrids.push(this.bottomRightGridOptions);
    this.bottomRightGridOptions.alignedGrids.push(this.topRightGridOptions);
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

  onBottomRightGridReady(params) {
    this.bottomRightGridApi = params.api;
    this.bottomRightGridColumnApi = params.columnApi;
  }

  onDragOver(event) {
    var dragSupported = event.dataTransfer.length;
    if (dragSupported) {
      event.dataTransfer.dropEffect = 'move';
    }
    event.preventDefault();
  }

  //Use this with Angular CDK's drop zone
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
    this.openDialog(item);
  }


  openDialog(item: FinancialConfiguration): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '600px',
      data: item,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe((result: FinancialConfigurationTracker) => {
      this.hasOneItemSaved = result.saved;
      let selectedComponent = this.selectedFinancialComponents.find(a => a.uuid === result.uuid);
      if (selectedComponent) {
        selectedComponent.configuration = result.configuration;
        this.rightGridApi.setRowData(this.selectedFinancialComponents);
        this.updateSummaryGrid();
      }
    });
  }

  getValue(propName) {
    if (propName === 'Installment')
      return (params) => {
        if (!params.node.footer)
          return params.data.configuration && params.data.configuration.installment
      };
    if (propName === 'Investment')
      return (params) => {
        if (!params.node.footer)
          return params.data.configuration && params.data.configuration.totalInvestment
      };
    if (propName === 'Duration')
      return (params) => {
        if (!params.node.footer)
          return params.data.configuration && params.data.configuration.year
      };
    if (propName === 'Return Rate')
      return (params) => {
        if (!params.node.footer)
          return params.data.configuration && params.data.configuration.returnRate
      };
    if (propName === 'Estimated Returns')
      return (params) => {
        if (!params.node.footer)
          return params.data.configuration && params.data.configuration.estimatedReturn
      };
    if (propName === 'Total Returns')
      return (params) => {
        if (!params.node.footer)
          return params.data.configuration && params.data.configuration.totalValue
      };
    if (propName === 'Liquidity')
      return (params) => {
        if (!params.node.footer)
          return params.data.configuration && params.data.configuration.liquidity
      };
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
      console.error('not adding row to avoid duplicates in the grid');
      return;
    }

    let financialConfig = data as FinancialConfiguration;
    if (financialConfig) {
      data.uuid = uuidv4();
      this.basket.push(data);
      this.selectedFinancialComponents.push(data);
      this.rightGridApi.setRowData(this.selectedFinancialComponents);
      this.updateSummaryGrid();
    }
    else {
      console.error('Invalid data supplied to Drag');
    }
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

  updateSummaryGrid() {
    let aggregate = this.selectedFinancialComponents.reduce((final, current) => {
      final.estimatedReturn = final.estimatedReturn + (current.configuration && current.configuration.estimatedReturn) || 0;
      final.installment = final.installment + (current.configuration && current.configuration.installment) || 0;
      final.totalInvestment = final.totalInvestment + (current.configuration && current.configuration.totalInvestment) || 0;
      final.totalValue = final.totalValue + (current.configuration && current.configuration.totalValue) || 0;
      return final;
    }, { estimatedReturn: 0, installment: 0, totalInvestment: 0, totalValue: 0 });
    this.bottomRightGridApi.setRowData([aggregate]);
  }

  rowDataChanged() {
    if (this.rightGridApi != null && this.rightGridApi != undefined && this.selectedFinancialComponents != null && this.selectedFinancialComponents != undefined) {
      if (this.selectedFinancialComponents.length === 1 && !this.hasOneItemSaved)
        this.rightGridApi.showNoRowsOverlay();
      else
        this.rightGridApi.hideOverlay();
    }
  }
}