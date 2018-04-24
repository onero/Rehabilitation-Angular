import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ExerciseModel} from '../../../client/shared/exercise.model';
import {ExerciseService} from '../../../shared/services/exercise.service';

@Component({
  selector: 'rehab-manage-exercises-list',
  templateUrl: './manage-exercises-list.component.html',
  styleUrls: ['./manage-exercises-list.component.scss']
})
export class ManageExercisesListComponent implements OnInit {
  @Output()
  exerciseSelected = new EventEmitter<ExerciseModel>();
  currentExercise: ExerciseModel;

  $exercises: Observable<ExerciseModel[]>;

  constructor(private exerciseService: ExerciseService) {
    this.$exercises = exerciseService.getExercises();
  }

  onExerciseSelected(exercise: ExerciseModel) {
    this.exerciseSelected.emit(exercise);
  }

  ngOnInit() {
  }

}
