import {Component, Input, OnInit} from '@angular/core';
import {ExerciseEntity} from '../../shared/entities/exercise.entity';

@Component({
  selector: 'rehab-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  @Input()
  currentExercise: ExerciseEntity;

  constructor() {
  }

  ngOnInit() {
  }

}
