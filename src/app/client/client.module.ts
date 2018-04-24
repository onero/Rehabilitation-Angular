import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ExercisesComponent} from './exercises/exercises.component';
import {HttpClientModule} from '@angular/common/http';
import {YoutubePlayerComponent} from './exercises/youtube-player/youtube-player.component';
import {YoutubeService} from './exercises/youtube-player/youtube.service';
import {YoutubePlayerModule} from 'ngx-youtube-player';

@NgModule({
  imports: [
    CommonModule,
    YoutubePlayerModule,
    HttpClientModule
  ],
  declarations: [ExercisesComponent, YoutubePlayerComponent],
  providers: [YoutubeService]
})
export class ClientModule { }
