import { HostListener } from '@angular/core';
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
  gifUrl: string = 'https://i.makeagif.com/media/3-06-2016/cS4w3b.gif'; // URL do GIF inicial
  audio = new Audio();
  gyro = new Audio();
  playInterval!: number;      // guarda o ID do setInterval
  firstClickDone = false;


  ngOnInit() {
    this.gyro.src = 'assets/gyro.mp3';
    this.gyro.load();
    this.gyro.play()
    this.playGyro();                  // toca na primeira vez (page load)
    this.audio.src = 'assets/yamate-kudasai.mp3';
    this.audio.load();

    this.playInterval = window.setInterval(() => {
      this.playGyro();
    }, 5 * 60 * 1000);

  }

  @HostListener('document:click')
  handleDocumentClick(): void {
    if (!this.firstClickDone) {
      this.playGyro();
      this.firstClickDone = true;   // bloqueia execuções futuras
    }
  }

  private playGyro(): void {
    this.gyro.currentTime = 0;
    this.gyro.play()
  }

  formatText(text: string) {
    if (!text) return '';

    return text
      .replace(/[!@#$%^&*(),.?":{}|<>]/g, '')
      .replace(/ç/g, 'c')
      .replace(/Ç/g, 'C');
  }

  onSubmit() {
    this.changeGif();
    this.audio.play()
    if (this.cardNumber && this.squad && this.cardTitle && this.workType && this.environment) {
      let formattedTitle = this.cardTitle.split(' ').join('-').toLowerCase();

      if (this.environment === 'AZDE') {
        this.outputBranch = `${this.workType}/${this.environment}-${this.cardNumber}-${this.formatText(formattedTitle)}`;
        this.outputCommit = `${this.workType}: [${this.environment}-${this.cardNumber}] ${this.formatText(this.cardTitle)}`;
      } else {
        this.outputBranch = `${this.workType}-${this.environment}Squad${this.squad}-${this.cardNumber}-${this.formatText(formattedTitle)}`;
        this.outputCommit = `${this.workType}(${this.squad}): [${this.environment}\\Squad ${this.squad} ${this.cardNumber}] - ${this.formatText(this.cardTitle)}`;
      }
    } 
  }

  onImageClick() {
    const gif = 'https://steamuserimages-a.akamaihd.net/ugc/545258778418733357/190047F53F0BD2E3C8590CF812CEF065CF40AF83/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false';

    if (this.gifUrl !== gif){
    }else {
      this.imageClickCount++;
      if (this.imageClickCount >= 5) {
        this.imageClickCount = 0;
        this.gifUrl = "https://i.makeagif.com/media/3-06-2016/cS4w3b.gif"
      }
    }
  }

  changeGif() {
    this.gifUrl = 'https://steamuserimages-a.akamaihd.net/ugc/545258778418733357/190047F53F0BD2E3C8590CF812CEF065CF40AF83/?imw=5000&imh=5000&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false';
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
