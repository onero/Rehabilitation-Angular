import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {ExerciseModel} from '../../shared/exercise.model';
import {ExerciseService} from '../shared/exercise.service';

@Component({
  selector: 'rehab-exercise-list',
  templateUrl: './exercise-list.component.html',
  styleUrls: ['./exercise-list.component.scss']
})
export class ExerciseListComponent implements OnInit {

  @Output()
  exerciseSelected = new EventEmitter<ExerciseModel>();

  exercisesFromClient: ExerciseModel[];

  constructor(private exerciseService: ExerciseService) {
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
    // this.fillListWithMock();
    this.exerciseService.getExercises().subscribe(exercises => {
      for (let i = 0; i < exercises.length; i++) {
        this.exercisesFromClient.push(exercises[i]);
      }
    });
  }

  onExerciseClick(exercise: ExerciseModel) {
    this.exerciseSelected.emit(exercise);
  }
}
