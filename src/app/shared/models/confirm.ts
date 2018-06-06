export class Confirm {
  title: string;
  message: string;
  trueButtonText: string;
  falseButtonText: string;
  constructor() {
    this.title = 'Confirm';
    this.message = 'Are you sure?';
    this.trueButtonText = 'Yes';
    this.falseButtonText = 'No';
  }
}
