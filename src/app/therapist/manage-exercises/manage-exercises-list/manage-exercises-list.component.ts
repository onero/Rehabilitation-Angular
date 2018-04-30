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

  @Input()
  hiddenExercises: ExerciseModel[];

  currentExercise: ExerciseModel;

  @Input()
  allowAddExercise = true;

  $exercises: Observable<ExerciseModel[]>;

  constructor(private exerciseService: ExerciseService,
              private router: Router) {
  }

  onExerciseSelected(exercise: ExerciseModel) {
    this.exerciseSelected.emit(exercise);
  }

  ngOnInit() {
    // Check for category name (if one is present, we are in Manage Exercises)
    if (this.currentCategoryName.length > 0) {
      this.$exercises = this.exerciseService.getExercisesByCategoryName(this.currentCategoryName);
      // If no category name we're in Manage Clients
    } else {
      this.$exercises = this.exerciseService.getExercises();
    }
  }

  addExercise() {
    this.router.navigate(['therapist/exercises/new', {category: this.currentCategoryName}]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.$exercises = this.exerciseService.getExercisesByCategoryName(this.currentCategoryName);
  }

}
