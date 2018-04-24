import { Component, OnInit } from '@angular/core';
import {ExerciseModel} from '../../client/shared/exercise.model';

@Component({
  selector: 'rehab-manage-exercises',
  templateUrl: './manage-exercises.component.html',
  styleUrls: ['./manage-exercises.component.scss']
})
export class ManageExercisesComponent implements OnInit {
  selectedExercise: ExerciseModel;

  constructor() { }

  ngOnInit() {
  }

  selectExercise(exercise: ExerciseModel) {
    this.selectedExercise = exercise;
  }

}
