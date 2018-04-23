import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisesComponent } from './exercises/exercises.component';
import { YoutubePlayerComponent } from './youtube-player/youtube-player.component';
import {YoutubePlayerModule} from 'ng2-youtube-player-mini/module/youtube-player.module';

@NgModule({
  imports: [
    CommonModule,
    YoutubePlayerModule
  ],
  declarations: [ExercisesComponent, YoutubePlayerComponent]
})
export class ClientModule { }
