import { Component, OnInit } from '@angular/core';
import { ExerciseModel } from '../shared/exercise.model';

@Component({
  selector: 'rehab-exercise-information',
  templateUrl: './exercise-information.component.html',
  styleUrls: ['./exercise-information.component.scss']
})
export class ExerciseInformationComponent implements OnInit {
  model1: ExerciseModel = {
    title: 'Fine motor control',
    category: 'Hand',
    description: 'This is good for your hand',
    repetition: '3x15, 3 times a day'
  };

  model2: ExerciseModel = {
    title: 'Fine motor control',
    category: 'Neck',
    description: 'This is good for your neck',
    repetition: '2x12, 2 times a day'
  };

  constructor() {
  }

  ngOnInit() {
  }

}
