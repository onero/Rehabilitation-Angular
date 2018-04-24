import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment.prod';
import { ClientModule } from './client/client.module';
import {AngularFirestore, AngularFirestoreModule} from 'angularfire2/firestore';
import { TherapistModule } from './therapist/therapist.module';


@NgModule({
  imports: [
    BrowserModule,
    AppRoutes,
    SharedModule,
    AuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ClientModule,
    TherapistModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
