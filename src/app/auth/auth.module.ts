import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { LoginService } from './shared/login.service';


@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
    FormsModule,
    HttpModule
  ],
  declarations: [LoginComponent],
  providers: [LoginService]
})
export class AuthModule { }
