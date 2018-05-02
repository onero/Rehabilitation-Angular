import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {ExerciseModel} from '../../shared/exercise.model';
import {YoutubeService} from '../../../shared/services/youtube.service';
import {YoutubeResponse} from '../../../shared/entities/YoutubeResponse.model';
import {ExerciseService} from '../../../shared/services/exercise.service';
import { RehabilitationPlan } from '../../shared/rehabilitation-plan.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthService } from '../../../auth/shared/auth.service';
import { ClientService } from '../../../shared/services/client.service';
import { ClientModel } from '../../../shared/entities/client.model';

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
              private youtubeService: YoutubeService,
              private authService: AuthService,
              private clientService: ClientService) {
  }

  ngOnInit() {
    // Instantiation of array.
    this.exercisesFromClient = [];

    this.getLoggedInUser();
  }

  /**
      Gets the uid from the logged in user.
   */
  private getLoggedInUser() {
    const userId = this.authService.getUserId();
    this.clientService.getCurrentClientById(userId).subscribe(user => {
      const loggedInUser = user as ClientModel;
      const rehabilitationPlan = loggedInUser.rehabilitationPlan;
      this.getExercisesFromRehabilitationPlan(rehabilitationPlan);
    });
  }

  /**
   * Get exercises from RehabilitationPlan.
   * TODO: Skovgaard (refactor to ExerciseService)
   */
  private getExercisesFromRehabilitationPlan(rehabilitationPlan: RehabilitationPlan) {
    if (rehabilitationPlan.exerciseIds) {
      // Run only if there is an exercise.
      if (rehabilitationPlan.exerciseIds.length > 0) {
        // Adds the exercises one by one.
        rehabilitationPlan.exerciseIds.forEach(exerciseId => {
          this.exerciseService.getExerciseById(exerciseId)
            .subscribe(clientExercise => {
              // Gets the id from the url.
              const videoId = this.youtubeService.getIdFromURL(clientExercise.videoUrl);
              this.youtubeService.getVideoInformation(videoId)
                .subscribe(result => {
                  // Gets the imgUrl from the youtubeService.
                  const ytResponse = result as YoutubeResponse;
                  clientExercise.imgUrl = ytResponse.items[0].snippet.thumbnails.default.url;
                  this.exercisesFromClient.push(clientExercise);
                });
            });
        });
      }
    }
  }

  /**
   * Emits the exercise clicked to the mother component.
   * @param {ExerciseModel} exercise
   */
  onExerciseClick(exercise: ExerciseModel) {
    this.exerciseSelected.emit(exercise);
  }
}
