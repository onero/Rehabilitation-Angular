import {ExerciseListComponent} from './exercises/exercise-list/exercise-list.component';
import {ExerciseService} from '../shared/services/exercise.service';
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

@NgModule({
  imports: [
    CommonModule,
    YoutubePlayerModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [ExercisesComponent, ExerciseInformationComponent, YoutubePlayerComponent, ExerciseListComponent, ProfileComponent],
  providers: [YoutubeService]
})
export class ClientModule { }
