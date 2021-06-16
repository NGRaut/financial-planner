import { CdkDragDrop, CdkDragMove, CdkDragStart, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatList } from '@angular/material';

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
    { field: 'make', width: '300px' }
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

  @ViewChild(MatList, { read: ElementRef, static: false }) child: ElementRef;
  _currentIndex;
  _currentField;

  constructor() { }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer !== event.container) {
      copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
