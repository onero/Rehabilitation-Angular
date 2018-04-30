import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthService {

  constructor(private fireAuth: AngularFireAuth,
              private router: Router) { }
  // TODO MSP Implement
  // getAuthUser(): Observable<User> {
  //   return this.fireAuth.authState
  //     .map(authState => {
  //       return {
  //         uid: authState.uid,
  //         email: authState.email
  //       };
  //     });
  // }
  //
  // isAuthenticated(): Observable<boolean> {
  //   return this.fireAuth.authState
  //     .map(authState => {
  //       return authState !== null;
  //     });
  // }
  //
  // login(email: string, password: string): Promise<any> {
  //   return this.fireAuth.auth
  //     .signInAndRetrieveDataWithEmailAndPassword(email, password);
  // }
  //
  // logout() {
  //   const username = this.getUsername();
  //   this.fireAuth.auth.signOut()
  //     .then(() => {
  //       this.router.navigateByUrl('/login')
  //         .then(() => {
  //           this.snackService.displaySnack('Goodbye ' + username, 2);
  //         });
  //     });
  // }
}
