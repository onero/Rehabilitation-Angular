import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ExerciseEntity} from '../../../shared/entities/exercise.entity';
import {YoutubeService} from '../../../shared/services/youtube.service';
import {YoutubeResponse} from '../../../shared/entities/YoutubeResponse.entity';
import {ExerciseService} from '../../../shared/services/exercise.service';
import {RehabilitationPlan} from '../../../shared/entities/rehabilitation-plan.entity';
import {AuthService} from '../../../auth/shared/auth.service';
import {ClientService} from '../../../shared/services/client.service';
import {ClientEntity} from '../../../shared/entities/client.entity';

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

    this.getLoggedInUser();
  }

  /**
      Gets the uid from the logged in user.
   */
  private getLoggedInUser() {
    const userId = this.authService.getUserId();
    this.clientService.getCurrentClientById(userId).subscribe(user => {
      const loggedInUser = user as ClientEntity;
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
                  // Make sure first exercise in list is selected
                  if (this.exercisesFromClient.length === 1) {
                    this.onExerciseClick(this.exercisesFromClient[0]);
                  }
                });
            });
        });
      }
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
