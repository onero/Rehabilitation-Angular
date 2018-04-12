import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment.prod';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutes,
    SharedModule,
    AuthModule,
    AngularFireModule.initializeApp(environment.firebase)    
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
