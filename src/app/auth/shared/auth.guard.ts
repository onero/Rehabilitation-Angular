import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {MessageService} from '../../shared/services/message.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private router: Router,
              private messageService: MessageService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
      .map(isLoggedIn => {
        if (isLoggedIn) { return true; }
        this.router.navigateByUrl('/login')
          .then(() => {
            this.messageService
              .displayMessage('Please login', 2);
          });
        return isLoggedIn;
      });
  }
}
