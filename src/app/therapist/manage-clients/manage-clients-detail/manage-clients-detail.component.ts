import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges} from '@angular/core';
import {ClientEntity} from '../../../shared/entities/client.entity';
import {ExerciseEntity} from '../../../shared/entities/exercise.entity';
import {ClientService} from '../../../shared/services/firestore/client.service';
import {AssignedExerciseService} from '../../../shared/services/firestore/assigned-exercise.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'rehab-manage-clients-detail',
  templateUrl: './manage-clients-detail.component.html',
  styleUrls: ['./manage-clients-detail.component.scss']
})
export class ManageClientsDetailComponent implements OnInit, OnChanges, OnDestroy {

  @Input()
  currentClientUid: string;

  currentClient: ClientEntity;
  $subscribe;

  @Output()
  evaluationsClicked = new EventEmitter();

  constructor(private clientService: ClientService,
              private assignExerciseService: AssignedExerciseService) {
  }

  ngOnInit() {
    // Save subscribe for possibility to unsubscribe on page change!
    this.$subscribe = this.clientService.getCurrentClientById(this.currentClientUid)
      .subscribe(client => this.currentClient = client);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.$subscribe = this.clientService.getCurrentClientById(this.currentClientUid)
      .subscribe(client => this.currentClient = client);
  }

  ngOnDestroy() {
    // Unsubscribe on page change!
    this.$subscribe.unsubscribe();
  }

  /**
   * Update rehabilitation plan on database
   */
  updateRehabilitationPlan() {
    this.clientService.updateRehabilitationPlanByClientUid(this.currentClient.uid, this.currentClient.rehabilitationPlan);
  }

  /**
   * Unassign exercise from client
   * @param {string} exerciseUid
   */
  unassignExerciseFromClient(exerciseUid: string) {
    // Reassign array of exercises to a new array without the exercise to remove
    this.currentClient.rehabilitationPlan.exercises =
      this.currentClient.rehabilitationPlan.exercises.filter(exercise => exercise.uid !== exerciseUid);
    this.assignExerciseService.unassignExerciseFromClient(exerciseUid, this.currentClient.uid);
    this.updateRehabilitationPlan();
  }

  /**
   * Assign exercise to plan
   * @param exercise
   */
  assignExerciseToClient(exercise: ExerciseEntity) {
    // Create partial exercise to save information load for DB
    const partialNewExercise: ExerciseEntity = {
      uid: exercise.uid,
      title: exercise.title,
      videoUrl: exercise.videoUrl,
      imgUrl: exercise.imgUrl
    };
    // Ensure exercises array is instantiated
    if (!this.currentClient.rehabilitationPlan.exercises) {
      this.currentClient.rehabilitationPlan.exercises = [];
    }
    this.currentClient.rehabilitationPlan.exercises.push(partialNewExercise);
    this.assignExerciseService.assignExerciseToClient(this.currentClient.uid, exercise.uid);
    this.updateRehabilitationPlan();
  }

}
