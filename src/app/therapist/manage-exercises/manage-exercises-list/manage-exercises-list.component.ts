import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ExerciseModel} from '../../../client/shared/exercise.model';
import {ExerciseService} from '../../../shared/services/exercise.service';
import {Router} from '@angular/router';

@Component({
  selector: 'rehab-manage-exercises-list',
  templateUrl: './manage-exercises-list.component.html',
  styleUrls: ['./manage-exercises-list.component.scss']
})
export class ManageExercisesListComponent implements OnInit, OnChanges {
  @Input()
  currentCategoryName = '';
  @Output()
  exerciseSelected = new EventEmitter<ExerciseModel>();
  currentExercise: ExerciseModel;

  $exercises: Observable<ExerciseModel[]>;

  constructor(private exerciseService: ExerciseService,
              private router: Router) {
  }

  onExerciseSelected(exercise: ExerciseModel) {
    this.exerciseSelected.emit(exercise);
  }

  ngOnInit() {
    this.$exercises = this.exerciseService.getExercisesByCategoryName(this.currentCategoryName);
  }

  addExercise() {
    this.router.navigate(['therapist/exercises/new', {category: this.currentCategoryName}]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.$exercises = this.exerciseService.getExercisesByCategoryName(this.currentCategoryName);
  }

}
