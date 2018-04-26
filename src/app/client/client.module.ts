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

@NgModule({
  imports: [
    CommonModule,
    YoutubePlayerModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [ExercisesComponent, ExerciseInformationComponent, YoutubePlayerComponent, ExerciseListComponent],
  providers: [YoutubeService]
})
export class ClientModule { }
