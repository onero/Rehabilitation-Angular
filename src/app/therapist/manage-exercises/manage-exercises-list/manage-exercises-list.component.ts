import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ExerciseEntity} from '../../../shared/entities/exercise.entity';
import {ExerciseService} from '../../../shared/services/exercise.service';
import {Router} from '@angular/router';
import {ISearch} from '../../../shared/component-interfaces/ISearch';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'rehab-manage-exercises-list',
  templateUrl: './manage-exercises-list.component.html',
  styleUrls: ['./manage-exercises-list.component.scss']
})
export class ManageExercisesListComponent implements OnInit, OnChanges, ISearch {
  @Input()
  currentCategoryName = '';
  @Output()
  exerciseSelected = new EventEmitter<ExerciseEntity>();

  searchValue = ' ';

  currentExercise: ExerciseEntity;

  // TODO ALH: Refactor with better solution!
  @Input()
  allowAddExercise = true;

  amountOfExercises: number;
  $paginatedExercises: Observable<ExerciseEntity[]>;
  page = 2;
  limit = 5;

  constructor(private exerciseService: ExerciseService,
              private router: Router) {
  }

  onExerciseSelected(exercise: ExerciseEntity) {
    this.exerciseSelected.emit(exercise);
  }

  ngOnInit() {
    // Set amount of exercises
    this.exerciseService.getAmountOfExercises()
      .subscribe(amount => this.amountOfExercises = amount);
    // Check for category name (if one is present, we are in Manage Exercises)
    if (this.currentCategoryName.length > 0) {
      this.paginate(this.page);
      // Else we are just showing a paginated list of all exercises
    } else {
      this.instantiateExercisesWithoutCategory();
    }
  }

  /**
   * Load all exercises for paginated list without category
   */
  private instantiateExercisesWithoutCategory() {
    this.$paginatedExercises = this.exerciseService.getFirstExercise()
      .switchMap(exercise =>
        this.exerciseService.getExercisesPaginated(this.limit, exercise));
  }

  addExercise() {
    this.router.navigate(['therapist/exercises/new', {category: this.currentCategoryName}]);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.currentCategoryName.length > 0) {
      this.paginate(1);
    }
  }

  /**
   * We will paginate
   * @param {number} page
   */
  paginate(page: number) {
    // Check for first page
    if (page === 1) {
      // When on page 1 we just get the first {{this.limit}} exercises
      this.$paginatedExercises = this.exerciseService.getExercisesByCategoryNamePaginated(this.currentCategoryName, this.limit);
    } else {
      // Update page number for paginator
      this.page = page;
      // Get paginated observable list of exercises, starting after last element in current observable collection
      this.$paginatedExercises = this.$paginatedExercises
        .map(paginatedExercises => {
          // Get a hold of last element in current observable collection
          return paginatedExercises[this.limit - 1];
        })
        .switchMap(latestExercise =>
          // Get observable collection starting after last exercise in old observable collection
          this.exerciseService
            .getExercisesByCategoryNamePaginated(this.currentCategoryName, this.limit, latestExercise));
    }
  }

  search(query: string) {
    // Check if user entered text or cleared search
    if (query.length > 0) {
      this.$paginatedExercises = this.exerciseService.getExercises()
        .map(exercises =>
          exercises.filter(exercise => {
            // Check if exercise has
            return exercise.title.includes(query) || // title
              exercise.category.includes(query) || // category
              exercise.description.includes(query) || // description
              exercise.videoUrl.includes(query) || // url
              exercise.repetition.includes(query); // repetition
          }));
    } else {
      // Reset to list of paginated exercises
      if (this.currentCategoryName.length > 0) {
        this.paginate(1);
        // Else we are just showing a paginated list of all exercises
      } else {
        this.instantiateExercisesWithoutCategory();
      }
    }
  }

}
