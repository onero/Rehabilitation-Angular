import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  static USER_ID_KEY = 'userId';
  static THERAPIST_UID = 'VztfbLv4PyZd8KRtbeMhrw17aZp1';

  constructor(public fireAuth: AngularFireAuth) {

  }

  /**
   * Gets the Clients Id from localStorage.
   * @returns {string}
   */
  getUserId() {
    return localStorage.getItem(AuthService.USER_ID_KEY);
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

  /**
   * Sign out the user
   * @returns {Promise<any>}
   */
  logout() {
    localStorage.clear();
    return this.fireAuth.auth.signOut();
  }
}
