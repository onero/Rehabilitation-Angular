import {Injectable} from '@angular/core';
import {SnackbarService} from 'ngx-snackbar';

@Injectable()
export class RehabErrorService {

  constructor(private snackbarService: SnackbarService) {
  }

  displayError(message: string) {
    this.snackbarService.add({
      msg: message,
      timeout: 5000,
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
