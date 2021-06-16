import { CdkDragDrop, CdkDragMove, CdkDragStart, copyArrayItem, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatList } from '@angular/material';

@Component({
  selector: 'app-flow-engine',
  templateUrl: './flow-engine.component.html',
  styleUrls: ['./flow-engine.component.scss']
})
export class FlowEngineComponent implements OnInit {
  todo = [
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

  done = [
    'test'
  ];

  items = [
    'Carrots',
    'Tomatoes',
    'Onions',
    'Apples',
    'Avocados'
  ];

  basket = [
    'Oranges',
    'Bananas',
    'Cucumbers'
  ];

  @ViewChild(MatList, { read: ElementRef, static: false }) child: ElementRef;
  _currentIndex;
  _currentField;

  constructor() { }

  ngOnInit() {
  }

  dragStart(event: CdkDragStart) {
    this._currentIndex = this.items.indexOf(event.source.data); // Get index of dragged type
    this._currentField = this.child.nativeElement.children[this._currentIndex]; // Store HTML field
  }

  moved(event: CdkDragMove) {
    // Check if stored HTML field is as same as current field
    if (this.child.nativeElement.children[this._currentIndex] !== this._currentField) {
      // Replace current field, basically replaces placeholder with old HTML content
      this.child.nativeElement.replaceChild(this._currentField, this.child.nativeElement.children[this._currentIndex]);
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
