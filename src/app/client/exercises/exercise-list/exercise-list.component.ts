import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ExerciseEntity} from '../../../shared/entities/exercise.entity';
import {YoutubeService} from '../../../shared/services/youtube.service';
import {YoutubeResponse} from '../../../shared/entities/YoutubeResponse.entity';
import {ExerciseService} from '../../../shared/services/exercise.service';
import {RehabilitationPlan} from '../../../shared/entities/rehabilitation-plan.entity';
import {AuthService} from '../../../auth/shared/auth.service';
import {ClientService} from '../../../shared/services/client.service';
import {ClientEntity} from '../../../shared/entities/client.entity';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'rehab-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {

  @Output()
  exerciseSelected = new EventEmitter<ExerciseEntity>();

  exercisesFromClient: ExerciseEntity[];

  constructor(private exerciseService: ExerciseService,
              private youtubeService: YoutubeService,
              private authService: AuthService,
              private clientService: ClientService) {
  }

  ngOnInit() {
    // Instantiation of array.
    this.exercisesFromClient = [];

    this.loadExercisesFromLoggedInClient();
  }

  /**
   * Loads the exercises from the current Client.
   */
  private loadExercisesFromLoggedInClient() {
    //
    const userId = this.authService.getUserId();
    this.clientService.getCurrentClientById(userId).subscribe(user => {
      const loggedInUser = user as ClientEntity;
      const exercises = loggedInUser.rehabilitationPlan.exercises;
      //
      exercises.forEach(exercise => {
        this.addExerciseToList(exercise);
      });
    });
  }

  /**
   * Adds the Thumbnail to the Exercise and then adds to the exercisesFromClient List.
   * @param {ExerciseEntity} exercise
   */
  private addExerciseToList(exercise: ExerciseEntity) {
    const exerciseAlreadyInList = this.exercisesFromClient.find(
      exerciseFromlist => exerciseFromlist.uid === exercise.uid);
    if (!exerciseAlreadyInList) {
      const videoId = this.youtubeService.getIdFromURL(exercise.videoUrl);
      this.youtubeService.getVideoInformation(videoId)
        .subscribe(result => {
          // Gets the imgUrl from the youtubeService.
          const ytResponse = result as YoutubeResponse;
          exercise.imgUrl = ytResponse.items[0].snippet.thumbnails.default.url;
          this.exercisesFromClient.push(exercise);
          // Make sure first exercise in list is selected
          if (this.exercisesFromClient.length === 1) {
            this.onExerciseClick(this.exercisesFromClient[0]);
          }
        });
    } else {
      exerciseAlreadyInList.title = exercise.title;
      exerciseAlreadyInList.description = exercise.description;
      exerciseAlreadyInList.repetition = exercise.repetition;
    }
  }

  /**
   * Emits the exercise clicked to the mother component.
   * @param {ExerciseEntity} exercise
   */
  onExerciseClick(exercise: ExerciseEntity) {
    this.exerciseSelected.emit(exercise);
  }
}
