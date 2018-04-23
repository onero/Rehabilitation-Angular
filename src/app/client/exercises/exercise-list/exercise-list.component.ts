import { Component, OnInit } from '@angular/core';
import {ExerciseModel} from '../../shared/exercise.model';

@Component({
  selector: 'rehab-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {

  exercisesFromClient: ExerciseModel[];

  constructor() {
  }

  private fillListWithMock() {
    for (let i = 0; i <= 4; i++) {
      this.exercisesFromClient.push(
        {
          title: `MockClient${i}`,
          repetition: `${i} x ${i}`,
          category: `MockCategory${i}`,
          description: `Mock Description ${i}`
        }
      );
    }
    this.exercisesFromClient.push();
  }

  ngOnInit() {
    this.exercisesFromClient = [];
    this.fillListWithMock();
  }

}
