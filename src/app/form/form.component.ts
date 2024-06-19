import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {
  cardNumber: string = '';
  squad: string = '';
  cardTitle: string = '';
  workType: string = '';
  outputBranch: string | undefined;
  outputCommit: string | undefined;

  onSubmit() {
    if (this.cardNumber && this.squad && this.cardTitle && this.workType) {
      const formattedTitle = this.cardTitle.split(' ').join('-');
      this.outputBranch = `${this.workType}-GMS-ERPSquad${this.squad}-${this.cardNumber}-${formattedTitle.toLowerCase()}`;
      this.outputCommit = `${this.workType}(${this.squad}): [GMS-ERP\\Squad ${this.squad} ${this.cardNumber}] - ${this.cardTitle}`;
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
}