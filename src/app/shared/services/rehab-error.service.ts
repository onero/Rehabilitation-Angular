import { Injectable } from '@angular/core';

@Injectable()
export class RehabErrorService {

  constructor() { }

  displayError(message: string) {
    console.log(message)
  }
}
