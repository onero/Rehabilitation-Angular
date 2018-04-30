import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ExerciseModel} from '../../../../client/shared/exercise.model';

@Component({
  selector: 'rehab-assign-exercise',
  templateUrl: './assign-exercise.component.html',
  styleUrls: ['./assign-exercise.component.scss']
})
export class AssignExerciseComponent implements OnInit {

  @Input()
  exercises: ExerciseModel[];

  constructor() {
  }

  ngOnInit() {
  }

}
