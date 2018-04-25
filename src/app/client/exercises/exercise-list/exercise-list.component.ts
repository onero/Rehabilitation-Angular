import { Component, OnInit } from '@angular/core';
import {ExerciseModel} from '../../shared/exercise.model';
import {ExerciseService} from '../../../shared/services/exercise.service';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'rehab-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {

  exercisesFromClient: ExerciseModel[];

  constructor(private exerciseService: ExerciseService) {
  }

  ngOnInit() {
    this.exercisesFromClient = [];
    // this.fillListWithMock();
    this.exerciseService.getExercises().subscribe(exercises => {
      for (let i = 0; i < exercises.length; i++) {
        this.exercisesFromClient.push(exercises[i]);
      }
    });
  }

  onExerciseClick(exercise: ExerciseModel) {
    // TODO MSP Dependency inject this exercise into videocomponent.
  }
}
