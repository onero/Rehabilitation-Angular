import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
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

  allExercises: ExerciseModel[];
  paginatedExercises: ExerciseModel[];
  page: number;
  limit = 5;

  constructor(private exerciseService: ExerciseService,
              private router: Router) {
    this.allExercises = [];
  }

  onExerciseSelected(exercise: ExerciseModel) {
    this.exerciseSelected.emit(exercise);
  }

  ngOnInit() {
    // Check for category name (if one is present, we are in Manage Exercises)
    if (this.currentCategoryName.length > 0) {
      this.instanciateExercises();
    } else {
       this.exerciseService.getExercises().subscribe(
         exercises => this.paginatedExercises = exercises as ExerciseModel[]
       );
    }
  }

  instanciateExercises() {
    this.page = 1;
    this.exerciseService.getExercisesByCategoryName(this.currentCategoryName).subscribe(
      exercises => {
        this.allExercises = exercises as ExerciseModel[];
        this.paginatedExercises = this.allExercises .slice(0, this.limit);
      });
  }

  addExercise() {
    this.router.navigate(['therapist/exercises/new', {category: this.currentCategoryName}]);
  }

  ngOnChanges(changes: SimpleChanges): void {
      this.instanciateExercises();
  }

  /**
   * We will paginate
   * @param {number} page
   */
  paginate(page: number) {
    let latest: any;
    // Check for first page
    if (page === 1) {
      latest = this.allExercises[0];
      // Get a hold of last element on current page
    } else {
      latest = this.allExercises[(page - 1) * this.limit];
    }

    this.exerciseService.getExercisesByCategoryNamePaginated(this.currentCategoryName, this.limit, latest).subscribe(paginatedExercises => {
        this.paginatedExercises = paginatedExercises;
      });
  }

}
