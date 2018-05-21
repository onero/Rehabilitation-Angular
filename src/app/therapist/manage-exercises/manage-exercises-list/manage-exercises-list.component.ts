import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ExerciseEntity} from '../../../shared/entities/exercise.entity';
import {ExerciseService} from '../../../shared/services/firestore/exercise.service';
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
    this.currentExercise = exercise;
    this.exerciseSelected.emit(exercise);
  }

  ngOnInit() {
    this.paginate(this.page);
    // Subscribe to changes in list, to inform list of update to currentExercise
    this.$paginatedExercises.subscribe(exercises => {
      // Check for current exercise selected
      if (this.currentExercise) {
        // Find current exercise among updates
        const updatedExercise = exercises.find(exercise => exercise.uid === this.currentExercise.uid);
        // Emit update
        this.onExerciseSelected(updatedExercise);
      }
    });
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
      this.paginateFromBeginningOfCollection();
    } else {
      this.paginateFromPage(page);
    }
  }

  /**
   * When on page 1 we just get the first {{this.limit}} exercises
   */
  private paginateFromBeginningOfCollection() {
    // Check which page we are displaying the exercises on
    if (this.isManageExercisePage()) {
      this.paginateExercisesFromBeginningOfCollectionByCurrentCategory();
    } else {
      this.paginateExercisesFromBeginningOfCollection();
    }
  }

  /**
   * Start paginating from very first exercise in collection
   */
  private paginateExercisesFromBeginningOfCollection() {
    this.exerciseService.getAmountOfExercises()
      .take(1)
      .subscribe(amount => this.amountOfExercises = amount);
    this.$paginatedExercises = this.exerciseService.getExercisesPaginated(this.limit);
  }

  /**
   * Start paginating from very first exercise in collection, by current category
   */
  private paginateExercisesFromBeginningOfCollectionByCurrentCategory() {
    this.$paginatedExercises = this.exerciseService.getExercisesByCategoryNamePaginated(this.currentCategoryName, this.limit);
    // Get amount of exercises in category
    this.exerciseService.getAmountOfExercisesInCategory(this.currentCategoryName)
      .take(1)
      .subscribe(amount => this.amountOfExercises = amount);
  }

  /**
   * Start paginating from provided page
   * @param {number} page
   */
  private paginateFromPage(page: number) {
    // Update page number for paginator
    this.page = page;
    // Check which page we are displaying the exercises on
    if (this.isManageExercisePage()) {
      this.paginateExercisesFromProvidedPageByCurrentCategory();
    } else {
      this.paginateExercisesFromProvidedPage();
    }
  }

  /**
   * Paginate observable list of exercises, starting after last element in current observable collection
   */
  private paginateExercisesFromProvidedPage() {
    this.$paginatedExercises = this.$paginatedExercises
      .map(paginatedExercises => {
        // Get a hold of last element in current observable collection
        return paginatedExercises[this.limit - 1];
      })
      .switchMap(latestExercise =>
        // Get observable collection starting after last exercise in old observable collection
        this.exerciseService.getExercisesPaginated(this.limit, latestExercise));
  }

  /**
   *  Paginate observable list of exercises by category, starting after last element in current observable collection
   */
  private paginateExercisesFromProvidedPageByCurrentCategory() {
    this.$paginatedExercises = this.$paginatedExercises
      .map(paginatedExercises => {
        // Get a hold of last element in current observable collection
        return paginatedExercises[this.limit - 1];
      })
      .switchMap(latestExercise =>
        // Get observable collection starting after last exercise in old observable collection
        this.exerciseService.getExercisesByCategoryNamePaginated(this.currentCategoryName, this.limit, latestExercise));
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
