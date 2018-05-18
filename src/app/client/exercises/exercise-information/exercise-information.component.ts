import {Component, Input, OnInit} from '@angular/core';
import { ExerciseEntity } from '../../../shared/entities/exercise.entity';

@Component({
  selector: 'rehab-exercise-information',
  templateUrl: './exercise-information.component.html',
  styleUrls: ['./exercise-information.component.scss']
})
export class ExerciseInformationComponent implements OnInit {

  @Input()
  exerciseModel: ExerciseEntity;

  constructor() {
  }

  ngOnInit() {
  }

  public updateInformation(newExercise: ExerciseEntity) {
    this.exerciseModel = newExercise;
  }
}
