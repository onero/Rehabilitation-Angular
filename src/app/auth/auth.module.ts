import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from './login/login.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import {AuthService} from './shared/auth.service';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {AuthGuard} from './shared/auth.guard';
import {LoggedInGuard} from './shared/logged-in.guard';


@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    FormsModule,
    HttpModule
  ],
  declarations: [LoginComponent],
  providers: [AuthService, AuthGuard, LoggedInGuard]
})
export class AuthModule {
}
