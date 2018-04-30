import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { AuthService } from './shared/auth.service';
import { LoginService } from './shared/login.service';


@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule
  ],
  declarations: [LoginComponent],
  providers: [AuthService, LoginService]
})
export class AuthModule { }
