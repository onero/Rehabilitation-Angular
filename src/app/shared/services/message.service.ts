import {Injectable} from '@angular/core';
import {SnackbarService} from 'ngx-snackbar';

@Injectable()
export class MessageService {

  constructor(private snackbarService: SnackbarService) {
  }

  displayMessage(message: string, durationInSeconds: number) {
    this.snackbarService.add({
      msg: message,
      timeout: (durationInSeconds * 1000),
      action: {
        text: 'Ok',
        onClick: (snack) => {
          this.clear();
        },
      }
    });
  }

  clear() {
    this.snackbarService.clear();
  }

}
