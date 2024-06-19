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
  clickCount: number = 0; // Contador de cliques
  showGif: boolean = false; // Controla a exibição do GIF

  onSubmit() {
    this.clickCount++; // Incrementa o contador de cliques
    if (this.clickCount >= 5) {
      this.showGif = true; // Exibe o GIF após 5 cliques
    } else {
      this.showGif = false; // Oculta o GIF se os cliques forem menos de 5
    }

    if (this.cardNumber && this.squad && this.cardTitle && this.workType) {
      const formattedTitle = this.cardTitle.split(' ').join('-');
      this.outputBranch = `${this.workType}-GMS-ERPSquad${this.squad}-${this.cardNumber}-${formattedTitle.toLowerCase()}`;
      this.outputCommit = `feat(${this.squad}): [GMS-ERP\\Squad ${this.squad} ${this.cardNumber}] - ${this.cardTitle}`;
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }
}
