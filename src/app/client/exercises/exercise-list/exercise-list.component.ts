import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {ExerciseModel} from '../../shared/exercise.model';
import {ExerciseService} from '../shared/exercise.service';
import {YoutubeService} from '../../../shared/services/youtube.service';
import {YoutubeResponse} from '../../../shared/models/YoutubeResponse.model';

@Component({
  selector: 'rehab-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {

  @Output()
  exerciseSelected = new EventEmitter<ExerciseModel>();

  exercisesFromClient: ExerciseModel[];

  constructor(private exerciseService: ExerciseService,
              private youtubeService: YoutubeService) {
  }

  ngOnInit() {
    // Instantiation of array.
    this.exercisesFromClient = [];
    // Gets all exercises from the service
    this.exerciseService.getExercises().subscribe(exercises => {
      for (const exercise of exercises) {
        // Gets the videoId on the exercise
        const videoId = this.youtubeService.getIdFromURL(exercise.videoUrl);
        this.youtubeService.getVideoInformation(videoId)
          .subscribe(result => {
            // Gets the imgUrl from the youtubeService.
            const ytResponse = result as YoutubeResponse;
            exercise.imgUrl = ytResponse.items[0].snippet.thumbnails.default.url;
            this.exercisesFromClient.push(exercise);
          });
      }
    });
  }

  /**
   * Emits the exercise clicked to the mother component.
   * @param {ExerciseModel} exercise
   */
  onExerciseClick(exercise: ExerciseModel) {
    this.exerciseSelected.emit(exercise);
  }
}
