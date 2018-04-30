import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientModel} from '../../shared/client.model';
import {RehabilitationPlanService} from '../../../shared/services/rehabilitation-plan.service';
import {RehabilitationPlan} from '../../../client/shared/rehabilitation-plan.model';
import {ExerciseModel} from '../../../client/shared/exercise.model';
import {ExerciseService} from '../../../shared/services/exercise.service';

@Component({
  selector: 'rehab-manage-clients-detail',
  templateUrl: './manage-clients-detail.component.html',
  styleUrls: ['./manage-clients-detail.component.scss']
})
export class ManageClientsDetailComponent implements OnInit {

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
    this.rehabilitationPlan.exerciseIds.forEach(exerciseId => {
      this.exerciseService.getExerciseById(exerciseId)
        .subscribe(clientExercise => this.exercises.push(clientExercise));
    });
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
}
