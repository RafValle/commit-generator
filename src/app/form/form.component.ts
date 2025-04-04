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
  environment: string = 'GMS-ERP';
  outputBranch: string | undefined;
  outputBranchNew!: string;
  outputCommit: string | undefined;
  copiedBranch: boolean = false;
  copiedCommit: boolean = false;
  copiedCreateBranch: boolean = false;
  clickCount: number = 0;
  imageClickCount: number = 0;
  showGif: boolean = false;
  showJoba: boolean = false;
  showGifSpecial!: string;
  gifUrl: string = 'https://steamuserimages-a.akamaihd.net/ugc/545258778418733357/190047F53F0BD2E3C8590CF812CEF065CF40AF83/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false'; // URL do GIF inicial
  audio = new Audio();

  ngOnInit() {
    this.audio.src = 'assets/yamate-kudasai.mp3';
    this.audio.load();
  }

  formatText(text: string) {
    if (!text) return '';

    return text
      .replace(/[!@#$%^&*(),.?":{}|<>]/g, '')
      .replace(/ç/g, 'c')
      .replace(/Ç/g, 'C');
  }

  onSubmit() {
    this.clickCount++;
    if (this.clickCount >= 5) {
      this.showGif = true;
    } else {
      this.showGif = false;
    }

    if (this.cardNumber && this.squad && this.cardTitle && this.workType && this.environment) {
      let formattedTitle = this.cardTitle.split(' ').join('-').toLowerCase();

      if (this.environment === 'AZDE') {
        this.outputBranch = `${this.workType}/${this.environment}-${this.cardNumber}-${this.formatText(formattedTitle)}`;
        this.outputCommit = `${this.workType}: [${this.environment}-${this.cardNumber}] ${this.formatText(this.cardTitle)}`;
      } else {
        this.outputBranch = `${this.workType}-${this.environment}Squad${this.squad}-${this.cardNumber}-${this.formatText(formattedTitle)}`;
        this.outputCommit = `${this.workType}(${this.squad}): [${this.environment}\\Squad ${this.squad} ${this.cardNumber}] - ${this.formatText(this.cardTitle)}`;
      }
    } else {
      this.clickCount++;
      if (this.clickCount >= 5) {
        this.showGif = true;
      } else {
        this.showGif = false;
      }
    }
  }

  onImageClick() {
    const gif = 'https://hentaidude.tv/wp-content/uploads/2022/01/KyonyuuElfOyakoSaimin-Episode1-Omake-4.gif';
    if (this.gifUrl === gif){
      this.showJoba = true;
    }else {
      this.imageClickCount++;
      if (this.imageClickCount >= 5) {
        this.imageClickCount = 0;
        this.changeGif();
      }
    }
  }

  changeGif() {
    this.gifUrl = 'https://hentaidude.tv/wp-content/uploads/2022/01/KyonyuuElfOyakoSaimin-Episode1-Omake-4.gif';
  }

  copyToClipboard(text: string, type: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.audio.play();

      if (type === 'branch') {
        this.copiedBranch = true;
        setTimeout(() => this.copiedBranch = false, 2000);
      } else if (type === 'commit') {
        this.copiedCommit = true;
        setTimeout(() => this.copiedCommit = false, 2000);
      } else if (type === 'createBranch') {
        this.copiedCreateBranch = true;
        setTimeout(() => this.copiedCreateBranch = false, 2000);
      }
    }).catch(err => {
      console.error('Erro ao copiar o texto:', err);
    });
  }


}
