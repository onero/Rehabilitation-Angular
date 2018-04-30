import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ClientModel} from '../../../shared/entities/client.model';
import {RehabilitationPlanService} from '../../../shared/services/rehabilitation-plan.service';
import {RehabilitationPlan} from '../../../client/shared/rehabilitation-plan.model';
import {ExerciseModel} from '../../../client/shared/exercise.model';
import {ExerciseService} from '../../../shared/services/exercise.service';

@Component({
  selector: 'rehab-manage-clients-detail',
  templateUrl: './manage-clients-detail.component.html',
  styleUrls: ['./manage-clients-detail.component.scss']
})
export class ManageClientsDetailComponent implements OnInit, OnChanges {

  @Input()
  currentClient: ClientModel;

  rehabilitationPlan: RehabilitationPlan;

  exercises: ExerciseModel[] = [];

  @Output()
  clientDeleted = new EventEmitter();

  constructor(private rehabilitationPlanService: RehabilitationPlanService,
              private exerciseService: ExerciseService) {
  }

  ngOnInit() {
    this.rehabilitationPlan = this.currentClient.rehabilitationPlan;
    this.updateExercises();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.rehabilitationPlan = this.currentClient.rehabilitationPlan;
    this.updateExercises();
  }

  /**
   * Update exercises in rehabilitationplan
   */
  updateExercises() {
    this.exercises = [];
    if (this.rehabilitationPlan.exerciseIds) {
      if (this.rehabilitationPlan.exerciseIds.length > 0) {
        this.rehabilitationPlan.exerciseIds.forEach(exerciseId => {
          this.exerciseService.getExerciseById(exerciseId)
            .subscribe(clientExercise => this.exercises.push(clientExercise));
        });
      }

    }
  }

  /**
   * Update rehabilitation plan on database
   */
  updateRehabilitationPlan() {
    this.rehabilitationPlanService.updatePlan(this.currentClient.uid, this.rehabilitationPlan)
      .then(() => {
        //  TODO ALH: Notify user!
      });
  }

  /**
   * Send request to delete currentClient
   */
  deleteClient() {
    this.clientDeleted.emit();
  }

  /**
   * Unassign exercise from client
   * @param {string} exerciseId
   */
  unassignExerciseFromClient(exerciseId: string) {
    const id = this.rehabilitationPlan.exerciseIds.findIndex(eId => eId === exerciseId);
    this.exercises.splice(id, 1);
    this.rehabilitationPlan.exerciseIds.splice(id, 1);
    this.updateRehabilitationPlan();
  }

  /**
   * Assign exercise to plan
   * @param {string} exerciseId
   */
  assignExerciseToClient(exerciseId: string) {
    this.rehabilitationPlan.exerciseIds.push(exerciseId);
    this.updateRehabilitationPlan();
  }
}
