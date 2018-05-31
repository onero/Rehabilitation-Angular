import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {ExerciseEntity} from '../../../shared/entities/exercise.entity';
import {CategoryService} from '../../../shared/services/firestore/category.service';
import {RehabModalService} from '../../../shared/services/rehab-modal.service';
import {MessageService} from '../../../shared/services/message.service';

@Component({
  selector: 'rehab-manage-categories-list',
  templateUrl: './manage-categories-list.component.html',
  styleUrls: ['./manage-categories-list.component.scss']
})
export class ManageCategoriesListComponent implements OnInit, OnDestroy {
  @Output()
  categorySelected = new EventEmitter<string>();
  currentCategory: ExerciseEntity;
  allCategories: any[];
  paginatedCategories: any[];
  page: number;
  limit = 5;

  $subscribe;

  constructor(private categoryService: CategoryService,
              public modalService: RehabModalService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.page = 1;
    this.$subscribe = this.categoryService.getCategories()
      .subscribe(categories => {
      this.allCategories = categories;
      this.paginatedCategories = this.allCategories.slice(0, this.limit);
    });
  }

  ngOnDestroy(): void {
    if (this.$subscribe) {
      this.$subscribe.unsubscribe();
    }
  }

  /**
   * We will paginate
   * @param {number} page
   */
  paginate(page: number) {
    let latest: any;

    // Check for first page
    if (page === 1) {
      latest = this.allCategories[0];
      // Get a hold of last element on current page
    } else {
      latest = this.allCategories[(page - 1) * this.limit];
    }

    // Paginate from last element on current page
    this.categoryService.getCategoriesPaginated(this.limit, latest).subscribe(paginatedCategories => {
      this.paginatedCategories = paginatedCategories;
    });
  }

  /**
   * When a category is clicked emit update
   */
  onCategorySelected(category) {
    this.categorySelected.emit(category.name);
  }

  /**
   * Add category with the parsed category name
   */
  addCategory(categoryName: string) {
    this.categoryService.createCategory(categoryName)
      .then(() => {
        this.messageService.displayMessage(`${categoryName} has been created`, 2);
      });
  }
}
