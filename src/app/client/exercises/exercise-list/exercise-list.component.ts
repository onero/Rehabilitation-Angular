import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ExerciseEntity} from '../../../shared/entities/exercise.entity';
import {YoutubeService} from '../../../shared/services/youtube.service';
import {ExerciseService} from '../../../shared/services/firestore/exercise.service';
import {AuthService} from '../../../auth/shared/auth.service';
import {ClientService} from '../../../shared/services/firestore/client.service';
import {ClientEntity} from '../../../shared/entities/client.entity';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'rehab-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {

  @Output()
  exerciseSelected = new EventEmitter<ExerciseEntity>();

  $client: Observable<ClientEntity>;

  constructor(private exerciseService: ExerciseService,
              private youtubeService: YoutubeService,
              private authService: AuthService,
              private clientService: ClientService) {
  }

  ngOnInit() {
    this.loadExercisesFromLoggedInClient();
  }

  /**
   * Loads the exercises from the current Client.
   */
  private loadExercisesFromLoggedInClient() {
    const userId = this.authService.getUserId();
    this.$client = this.clientService.getCurrentClientById(userId);
  }

  /**
   * Emits the exercise clicked to the mother component.
   * @param {ExerciseEntity} exercise
   */
  onExerciseClick(exercise: ExerciseEntity) {
    this.exerciseSelected.emit(exercise);
  }
}
