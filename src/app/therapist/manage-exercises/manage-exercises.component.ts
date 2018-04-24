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
    // TODO ALH: Remove!
    this.selectedExercise = {
      title: 'Test',
      category: 'Test',
      description: 'BlaBlaBlaBlaBla BlaBlaBlaBlaBla BlaBlaBla',
      repetition: '3x3'
    };
  }

}
