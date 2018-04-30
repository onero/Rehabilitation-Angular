import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ExerciseModel} from '../../../../client/shared/exercise.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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

  constructor(private modalService: NgbModal) {
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

  /**
   * Opens up the modal to add a new client.
   * @param content
   */
  open(content) {
    this.modalService.open(content);
  }
}
