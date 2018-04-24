import {Component, OnInit, ViewChild} from '@angular/core';
import {YoutubePlayerComponent} from './youtube-player/youtube-player.component';
import { ExerciseModel } from '../shared/exercise.model';
import { ExerciseInformationComponent } from './exercise-information/exercise-information.component';

@Component({
  selector: 'rehab-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
  // Set reference to youtubeChild youtube player
  @ViewChild('youtubePlayer') youtubeChild: YoutubePlayerComponent;
  @ViewChild('exerciseInformation') exerciseInformationChild: ExerciseInformationComponent;
  currentVideoId: string;


  constructor() {
  }

  ngOnInit() {
    // TODO ALH: Dynamically insert videoID!
    this.currentVideoId = '8GI7pzelfJk';
  }

  notifyOnNewVideoSelected(exercise: ExerciseModel) {
    this.loadNewVideoById(exercise.videoUrl);
    this.loadNewExerciseInformation(exercise);
  }

  /**
   * Load a new video, by its id
   * @param {string} videoId
   */
  loadNewVideoById(videoId: string) {
    this.youtubeChild.loadVideoByUrl(videoId);
  }

  loadNewExerciseInformation (exercise: ExerciseModel) {
    this.exerciseInformationChild.updateInformation(exercise);
  }

}
