import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class AuthService {
  static CLIENT_ID_KEY = 'clientId';

  constructor(public fireAuth: AngularFireAuth) {
    fireAuth.authState.subscribe(result => {
      if (result) {
        localStorage.setItem(AuthService.CLIENT_ID_KEY, result.uid);
      }
    });
  }

  login(email: string, password: string): Promise<any> {
    return this.fireAuth.auth
      .signInAndRetrieveDataWithEmailAndPassword(email, password);
  }

}
