import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {MessageService} from '../../shared/services/message.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  static THERAPIST_URL = 'therapist/clients';
  static CLIENT_URL = 'client/exercises';

  constructor(private authService: AuthService,
              private router: Router,
              private messageService: MessageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
      .map(isLoggedIn => {
        if (isLoggedIn) {
          if (this.authService.isTherapistLogin()) {
            this.router.navigateByUrl(LoggedInGuard.THERAPIST_URL)
              .then(() => {
                this.messageService.displayMessage('Let me help you back on track!', 2);
              });
          } else {
            this.router.navigateByUrl(LoggedInGuard.CLIENT_URL)
              .then(() => {
                this.messageService.displayMessage('Let me help you back on track!', 2);
              });
          }
        }
        return !isLoggedIn;
      });
  }
}
