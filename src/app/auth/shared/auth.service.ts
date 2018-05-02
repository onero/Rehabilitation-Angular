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

  /**
   * Gets the Clients Id from localStorage.
   * @returns {string}
   */
  getUserId() {
    return localStorage.getItem(AuthService.CLIENT_ID_KEY);
  }

  /**
   * Signing in with email & password.
   * @param {string} email
   * @param {string} password
   * @returns {Promise<any>}
   */
  login(email: string, password: string): Promise<any> {
    return this.fireAuth.auth
      .signInAndRetrieveDataWithEmailAndPassword(email, password);
  }

  /**
   * When creating a client make the password '123456' as a default password (for now).
   * @param {string} email
   * @returns {Promise<any>}
   */
  createClientAuthUser(email: string): Promise<any> {
    // TODO MSP Make real password creation?
    const password = '123456';
    return this.fireAuth.auth
      .createUserAndRetrieveDataWithEmailAndPassword(email, password);
  }

}
