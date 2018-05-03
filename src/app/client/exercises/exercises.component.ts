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
  }

  /**
   * As the mother class of my children og want to notify my children when a new video is selected.
   * @param {ExerciseModel} exercise
   */
  notifyOnNewVideoSelected(exercise: ExerciseModel) {
    this.currentVideoId = exercise.videoUrl;
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

  /**
   * Loads the new exercise information.
   * @param {ExerciseModel} exercise
   */
  loadNewExerciseInformation (exercise: ExerciseModel) {
    this.exerciseInformationChild.updateInformation(exercise);
  }

}
