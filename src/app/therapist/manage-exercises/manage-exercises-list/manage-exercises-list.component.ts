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

  $paginatedExercises: Observable<ExerciseEntity[]>;
  amountOfExercises: number;
  page = 1;
  limit = 5;

  constructor(private exerciseService: ExerciseService,
              private router: Router) {
  }

  onExerciseSelected(exercise: ExerciseEntity) {
    this.exerciseSelected.emit(exercise);
  }

  ngOnInit() {
    this.paginate(this.page);
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
   * Verify we are on the mange exercise page, by checking for a category name
   * @returns {boolean}
   */
  isManageExercisePage(): boolean {
    return this.currentCategoryName.length > 0;
  }

  /**
   * We will paginate
   * @param {number} page
   */
  paginate(page: number) {
    // Check for first page
    if (page === 1) {
      // When on page 1 we just get the first {{this.limit}} exercises
      // Check which page we are displaying the exercises on
      if (this.isManageExercisePage()) {
        this.$paginatedExercises = this.exerciseService.getExercisesByCategoryNamePaginated(this.currentCategoryName, this.limit);
        // Get amount of exercises in category
        this.exerciseService.getAmountOfExercisesInCategory(this.currentCategoryName)
          .take(1)
          .subscribe(amount => this.amountOfExercises = amount);
      } else {
        // Get amount of all exercises in firestore collection
        this.exerciseService.getAmountOfExercises()
          .take(1)
          .subscribe(amount => this.amountOfExercises = amount);
        this.$paginatedExercises = this.exerciseService.getExercisesPaginated(this.limit);
      }
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
      // Get all exercises to search through
      this.$paginatedExercises = this.exerciseService.getExercises()
        .map(exercises => {
          // Filter on attributes from exercise
          const filteredExercises = exercises.filter(exercise => {
            // Check if exercise has
            return exercise.title.includes(query) || // title
              exercise.category.includes(query) || // category
              exercise.description.includes(query) || // description
              exercise.videoUrl.includes(query) || // url
              exercise.repetition.includes(query); // repetition
          });
          // Update paginated amount of exercises to result amount
          this.amountOfExercises = filteredExercises.length;
          return filteredExercises;
        });
    } else {
      // User cleared search field, so we reset to list of paginated exercises
      this.paginate(1);
    }
  }

}
