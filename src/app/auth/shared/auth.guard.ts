import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {MessageService} from '../../shared/services/message.service';

const loginRoute = '/login';
const loginFailMessage = 'Please login';

/**
 * AuthGuard checks whether or not the user is logged in through the Auth Service.
 */
@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private messageService: MessageService) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
      .map(isLoggedIn => {
        if (isLoggedIn) {
          return true;
        }
        this.router.navigateByUrl(loginRoute)
          .then(() => {
            this.messageService
              .displayMessage(loginFailMessage, 2);
          });
        return false;
      });
  }
}
