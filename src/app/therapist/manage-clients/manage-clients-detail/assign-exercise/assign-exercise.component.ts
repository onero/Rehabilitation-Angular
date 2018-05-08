import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ExerciseModel} from '../../../../client/shared/exercise.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RehabModalService} from '../../../../shared/services/rehab-modal.service';

@Component({
  selector: 'rehab-assign-exercise',
  templateUrl: './assign-exercise.component.html',
  styleUrls: ['./assign-exercise.component.scss']
})
export class AssignExerciseComponent implements OnInit {

  @Input()
  exercises: ExerciseModel[] = [];

  @Output()
  exerciseUnassigned = new EventEmitter<string>();

  @Output()
  exerciseAssigned = new EventEmitter<string>();

  constructor(public modalService: RehabModalService) {
  }

  ngOnInit() {
  }

  /**
   * Unassign exercise from client
   * @param {string} uid
   */
  onExerciseUnassigned(uid: string) {
    this.exerciseUnassigned.emit(uid);
  }

  /**
   * Assign selected exercise
   * @param {ExerciseModel} exercise
   */
  assignSelectedExercise(exercise: ExerciseModel) {
    this.exercises.push(exercise);
    this.exerciseAssigned.emit(exercise.uid);
  }
}
