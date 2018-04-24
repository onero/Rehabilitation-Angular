import {NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';
import {ExercisesComponent } from './exercises/exercises.component';
import {ExerciseInformationComponent } from './exercises/exercise-information/exercise-information.component';
import {YoutubePlayerModule} from 'ng2-youtube-player-mini/module/youtube-player.module';
import {HttpClientModule} from '@angular/common/http';
import {YoutubePlayerComponent} from './exercises/youtube-player/youtube-player.component';
import {YoutubeService} from './exercises/youtube-player/youtube.service';
import {ExerciseListComponent} from './exercises/exercise-list/exercise-list.component';

@NgModule({
  imports: [
    CommonModule,
    YoutubePlayerModule,
    HttpClientModule
  ],
  declarations: [ExercisesComponent, ExerciseInformationComponent, YoutubePlayerComponent, ExerciseListComponent],
  providers: [YoutubeService]
})
export class ClientModule { }
