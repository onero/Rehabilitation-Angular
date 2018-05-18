import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ExerciseEntity} from '../../../shared/entities/exercise.entity';
import {Observable} from 'rxjs/Observable';
import {CategoryService} from '../../../shared/services/category.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RehabModalService} from '../../../shared/services/rehab-modal.service';

@Component({
  selector: 'rehab-manage-categories-list',
  templateUrl: './manage-categories-list.component.html',
  styleUrls: ['./manage-categories-list.component.scss']
})
export class ManageCategoriesListComponent implements OnInit {
  @Output()
  categorySelected = new EventEmitter<string>();
  currentCategory: ExerciseEntity;
  allCategories: any[];
  paginatedCategories: any[];
  page: number;
  limit = 5;


  constructor(private categoryService: CategoryService,
              public modalService: RehabModalService) { }

  ngOnInit() {
    this.page = 1;
    this.categoryService.getCategories().subscribe(categories => {
      this.allCategories = categories;
      this.paginatedCategories = this.allCategories.slice(0, this.limit);
    });
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
    this.categoryService.createCategory(categoryName);
  }
}
