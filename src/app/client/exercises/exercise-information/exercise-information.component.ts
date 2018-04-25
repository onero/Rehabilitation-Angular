import {Component, Input, OnInit} from '@angular/core';
import { ExerciseModel } from '../../shared/exercise.model';

@Component({
  selector: 'rehab-exercise-information',
  templateUrl: './exercise-information.component.html',
  styleUrls: ['./exercise-information.component.scss']
})
export class ExerciseInformationComponent implements OnInit {

  @Input()
  exerciseModel: ExerciseModel;

  constructor() {
  }

  ngOnInit() {
    this.emptyExercise();
  }

  /**
   * Sets the exercise to be empty.
   */
  private emptyExercise() {
    this.exerciseModel = {
      title: '',
      category: '',
      description: '',
      repetition: '',
      videoUrl: ''
    };
  }

  public updateInformation(newExercise: ExerciseModel) {
    this.exerciseModel = newExercise;
  }
}
