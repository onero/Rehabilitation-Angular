import {ExerciseListComponent} from './exercises/exercise-list/exercise-list.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExercisesComponent} from './exercises/exercises.component';
import {HttpClientModule} from '@angular/common/http';
import {YoutubePlayerComponent} from './exercises/youtube-player/youtube-player.component';
import {YoutubeService} from '../shared/services/youtube.service';
import {YoutubePlayerModule} from 'ngx-youtube-player';
import {ExerciseInformationComponent} from './exercises/exercise-information/exercise-information.component';
import {SharedModule} from '../shared/shared.module';
import { ProfileComponent } from './profile/profile.component';
import {FormsModule} from '@angular/forms';
import {TherapistModule} from '../therapist/therapist.module';
import { ContactComponent } from './contact/contact.component';
import { EvaluationComponent } from './evaluation/evaluation.component';

@NgModule({
  imports: [
    CommonModule,
    YoutubePlayerModule,
    HttpClientModule,
    SharedModule,
    FormsModule,
    TherapistModule
  ],
  declarations: [ExercisesComponent, ExerciseInformationComponent, YoutubePlayerComponent, ExerciseListComponent, ProfileComponent, ContactComponent, EvaluationComponent],
  providers: [YoutubeService]
})
export class ClientModule { }
