import {Component, Input, OnInit} from '@angular/core';
import {ExerciseModel} from '../../../client/shared/exercise.model';

@Component({
  selector: 'rehab-manage-exercises-detail',
  templateUrl: './manage-exercises-detail.component.html',
  styleUrls: ['./manage-exercises-detail.component.scss']
})
export class ManageExercisesDetailComponent implements OnInit {
  @Input()
  currentExercise: ExerciseModel;

  constructor() { }

  ngOnInit() {
  }

}
