import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs/Observable';
import {MessageService} from '../../shared/services/message.service';

// Added to enable programmatic creation of clients, without also changing AuthState!
const secondaryApp = firebase.initializeApp(environment.firebase, 'Secondary');

@Injectable()
export class AuthService {
  static USER_ID_KEY = 'userId';
  static THERAPIST_UID = 'VztfbLv4PyZd8KRtbeMhrw17aZp1';
  static THERAPIST_EMAIL = 'therapist@test.dk';
  static USER_PASSWORD = '123456';


  constructor(public fireAuth: AngularFireAuth,
              private message: MessageService) {
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
    const password = AuthService.USER_PASSWORD;
    return secondaryApp.auth()
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

  isAuthenticated(): Observable<boolean> {
    return this.fireAuth.authState
      .map(authState => {
        return authState !== null;
      });
  }

  isTherapistLogin() {
    return this.fireAuth.auth.currentUser.email === AuthService.THERAPIST_EMAIL;
  }

  /**
   * Check if saved user key value in local storage matches therapist key
   * @returns {boolean}
   */
  userIsTherapist() {
    return localStorage.getItem(AuthService.USER_ID_KEY) === AuthService.THERAPIST_UID;
  }

  /**
   * Check if user is loggedin
   * @returns {boolean}
   */
  userIsLoggedIn() {
    return localStorage.getItem(AuthService.USER_ID_KEY);
  }
}
