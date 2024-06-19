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
  clickCount: number = 0; // Contador de cliques do botão
  imageClickCount: number = 0; // Contador de cliques da imagem
  showGif: boolean = false; // Controla a exibição do GIF
  gifUrl: string = 'https://steamuserimages-a.akamaihd.net/ugc/545258778418733357/190047F53F0BD2E3C8590CF812CEF065CF40AF83/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'; // URL do GIF inicial

  onSubmit() {
    this.clickCount++; 
    if (this.clickCount >= 5) {
      this.showGif = true; 
    } else {
      this.showGif = false; 
    }

    if (this.cardNumber && this.squad && this.cardTitle && this.workType) {
      const formattedTitle = this.cardTitle.split(' ').join('-');
      this.outputBranch = `${this.workType}-GMS-ERPSquad${this.squad}-${this.cardNumber}-${formattedTitle.toLowerCase()}`;
      this.outputCommit = `feat(${this.squad}): [GMS-ERP\\Squad ${this.squad} ${this.cardNumber}] - ${this.cardTitle}`;
    } else {
      this.clickCount++; 
      if (this.clickCount >= 5) {
        this.showGif = true; 
      } else {
        this.showGif = false; 
      }    }
  }

  onImageClick() {
    this.imageClickCount++; 
    if (this.imageClickCount >= 5) {
      this.imageClickCount = 0; 
      this.changeGif(); 
    }
  }

  changeGif() {
    this.gifUrl = 'https://hentaidude.tv/wp-content/uploads/2022/01/KyonyuuElfOyakoSaimin-Episode1-Omake-4.gif';
  }
}
