import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSliderChange } from '@angular/material';
import { Subject } from 'rxjs';
import { FinancialConfiguration } from '../../flow-engine.component';
import { DialogConfig } from '../dialog/dialog.component';

interface Currency {
  code: string;
  symbol: string;
}
@Component({
  selector: 'app-mutual-fund',
  templateUrl: './mutual-fund.component.html',
  styleUrls: ['./mutual-fund.component.scss']
})
export class MutualFundComponent implements OnInit {
  addressForm = this.fb.group({
    company: null,
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    address: [null, Validators.required],
    address2: null,
    city: [null, Validators.required],
    state: [null, Validators.required],
    postalCode: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    shipping: ['free', Validators.required]
  });

  hasUnitNumber = false;

  currencies: Currency[] = [
    {
      code: 'INR',
      symbol: '\\20B9' //U+20B9
    }
  ]

  frequency = {
    min: 500,
    max: 200000,
    step: 500
  }

  expectedReturnRate = {
    min: 1,
    max: 40,
    step: 1
  }

  timePeriod = {
    min: 1,
    max: 30,
    step: 1
  }

  selectedConfiguration = {
    year: 10,
    returnRate: 12,
    installment: 500,
    totalInvestment: 0,
    totalValue: 0,
    estimatedReturn: 0
  };

  selectedCurrency: string;
  selectedCurrencies: Currency[];
  sipFormula: '5000 * (Math.pow((1 + 0.01), 120) - 1) / 0.01 * 1.01';

  @Input('config') dialogConfig: DialogConfig;

  constructor(private fb: FormBuilder) {
    this.selectedCurrency = this.currencies.find(a => a.code === 'INR').code;
    this.selectedCurrencies = this.currencies;
  }

  ngOnInit(): void {
    if (this.dialogConfig.dialogData.configuration)
      this.selectedConfiguration = JSON.parse(JSON.stringify(this.dialogConfig.dialogData.configuration));
    this.dataChanged();
    this.dialogConfig.dataSubject$.subscribe(() => {
      this.dialogConfig.dataSubject$.unsubscribe();
      this.save();
    });
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }
    return value;
  }

  onKey(value) {
    this.selectedCurrencies = this.search(value);
  }

  search(value: string) {
    let filter = value.toLowerCase();
    return this.currencies.filter(option =>
      option.code.toLowerCase().startsWith(filter)
    );
  }

  keyPress(event) {
    if (event.which < 48 || event.which > 57) {
      event.preventDefault();
    }
    this.dataChanged();
  }

  calculateSip(monthlyAmount, rateOfInterest, totalMonths) {
    return monthlyAmount * (Math.pow((1 + (rateOfInterest / 100 / 12)), totalMonths) - 1) / (rateOfInterest / 100 / 12) * (1 + (rateOfInterest / 100 / 12));
  }

  dataChanged() {
    this.selectedConfiguration.totalInvestment = this.selectedConfiguration.installment * this.selectedConfiguration.year * 12;
    this.selectedConfiguration.totalValue = Math.round(this.calculateSip(this.selectedConfiguration.installment, this.selectedConfiguration.returnRate, this.selectedConfiguration.year * 12));
    this.selectedConfiguration.estimatedReturn = this.selectedConfiguration.totalValue - this.selectedConfiguration.totalInvestment;
  }

  save(): void {
    let newConfiguration: FinancialConfiguration = { ...this.dialogConfig.dialogData, configuration: { ...this.selectedConfiguration } };
    this.dialogConfig.close(newConfiguration);
  }

  onInstallmentChange(value) {
    this.selectedConfiguration.installment = value;
    this.dataChanged();
  }

  onInterestChange(value) {
    this.selectedConfiguration.returnRate = value;
    this.dataChanged();
  }

  onYearChange(value) {
    this.selectedConfiguration.year = value;
    this.dataChanged();
  }

  // onNoClick(): void {
  //   // let newConfiguration = { ...this.dialogConfig.dialogData, configuration: this.selectedConfiguration };
  //   this.dialogConfig.close(this.dialogConfig.dialogData as FinancialConfiguration);
  // }
}