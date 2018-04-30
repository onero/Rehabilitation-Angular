import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ExerciseModel} from '../../../../client/shared/exercise.model';

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

  constructor() {
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
}
