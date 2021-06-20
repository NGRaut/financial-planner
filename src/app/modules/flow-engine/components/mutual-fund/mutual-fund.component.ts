import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

interface Currency {
  code: string;
  symbol: string;
}
@Component({
  selector: 'app-mutual-fund',
  templateUrl: './mutual-fund.component.html',
  styleUrls: ['./mutual-fund.component.scss']
})
export class MutualFundComponent {
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

  selectedYear = 10;
  selectedCurrency: string;
  selectedCurrencies: Currency[];
  selectedReturnRate = 12;
  selectedInstallment = 500;
  totalInvestment: number = 0;
  totalValue: number = 0;
  estimatedReturn: number = 0;
  sipFormula: '5000 * (Math.pow((1 + 0.01), 120) - 1) / 0.01 * 1.01';

  constructor(private fb: FormBuilder) {
    this.selectedCurrency = this.currencies.find(a => a.code === 'INR').code;
    this.selectedCurrencies = this.currencies;
    this.dataChanged();
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
    if (event.which < 48 || event.which > 57)
    {
      event.preventDefault();
    }
  }

  calculateSip(monthlyAmount, rateOfInterest, totalMonths) {
    return monthlyAmount * (Math.pow((1 + (rateOfInterest/100/12)), totalMonths) - 1) / (rateOfInterest/100/12) * (1+ (rateOfInterest/100/12));
  }

  dataChanged() {
    this.totalInvestment = this.selectedInstallment * this.selectedYear * 12;
    this.totalValue = Math.round(this.calculateSip(this.selectedInstallment, this.selectedReturnRate, this.selectedYear * 12));
    this.estimatedReturn = this.totalValue - this.totalInvestment;
  }

}