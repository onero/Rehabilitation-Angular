import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientEntity} from '../../../shared/entities/client.entity';
import {ExerciseEntity} from '../../../shared/entities/exercise.entity';
import {ClientService} from '../../../shared/services/client.service';
import {e, E} from '@angular/core/src/render3';

@Component({
  selector: 'rehab-manage-clients-detail',
  templateUrl: './manage-clients-detail.component.html',
  styleUrls: ['./manage-clients-detail.component.scss']
})
export class ManageClientsDetailComponent implements OnInit {

  @Input()
  currentClient: ClientEntity;

  @Output()
  clientDeleted = new EventEmitter();
  @Output()
  evaluationsClicked = new EventEmitter();

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
  }

  /**
   * Update rehabilitation plan on database
   */
  updateRehabilitationPlan() {
    this.clientService.updateRehabilitationPlanByClientUid(this.currentClient.uid, this.currentClient.rehabilitationPlan);
  }

  /**
   * Send request to delete currentClient
   */
  deleteClient() {
    this.clientDeleted.emit();
  }

  /**
   * Unassign exercise from client
   * @param {string} exerciseUid
   */
  unassignExerciseFromClient(exerciseUid: string) {
    // Reassign array of exercises to a new array without the exercise to remove
    this.currentClient.rehabilitationPlan.exercises =
      this.currentClient.rehabilitationPlan.exercises.filter(exercise => exercise.uid !== exerciseUid);
    this.clientService.unassignExerciseFromClient(exerciseUid, this.currentClient.uid);
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
      videoUrl: exercise.videoUrl
    };
    // Ensure exercises array is instantiated
    if (!this.currentClient.rehabilitationPlan.exercises) {
      this.currentClient.rehabilitationPlan.exercises = [];
    }
    this.currentClient.rehabilitationPlan.exercises.push(partialNewExercise);
    this.clientService.assignExerciseToClient(this.currentClient.uid, exercise.uid);
    this.updateRehabilitationPlan();
  }
}
