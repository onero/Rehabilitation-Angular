import {ExerciseListComponent} from './exercises/exercise-list/exercise-list.component';
import {ExerciseService} from './exercises/shared/exercise.service';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExercisesComponent} from './exercises/exercises.component';
import {HttpClientModule} from '@angular/common/http';
import {YoutubePlayerComponent} from './exercises/youtube-player/youtube-player.component';
import {YoutubeService} from './exercises/youtube-player/youtube.service';
import {YoutubePlayerModule} from 'ngx-youtube-player';
import {ExerciseInformationComponent} from './exercises/exercise-information/exercise-information.component';

@NgModule({
  imports: [
    CommonModule,
    YoutubePlayerModule,
    HttpClientModule
  ],
  declarations: [ExercisesComponent, ExerciseInformationComponent, YoutubePlayerComponent, ExerciseListComponent],
  providers: [YoutubeService, ExerciseService]
})
export class ClientModule { }
