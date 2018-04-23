import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisesComponent } from './exercises/exercises.component';
import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';
import {YoutubePlayerModule} from 'ng2-youtube-player-mini/module/youtube-player.module';
import { YoutubeService } from './youtube-player/youtube.service';
import {HttpClientModule} from '@angular/common/http';

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
