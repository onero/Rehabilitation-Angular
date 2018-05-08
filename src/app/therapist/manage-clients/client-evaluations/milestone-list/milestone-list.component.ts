import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MilestoneEntity} from '../../../../shared/entities/milestone.entity';
import {MilestoneService} from '../../../../shared/services/milestone.service';
import 'rxjs/add/operator/take';

@Component({
  selector: 'rehab-milestone-list',
  templateUrl: './milestone-list.component.html',
  styleUrls: ['./milestone-list.component.scss']
})
export class MilestoneListComponent implements OnInit, OnChanges {

  @Input()
  milestones: MilestoneEntity[];

  @Output()
  milestoneSelected = new EventEmitter<MilestoneEntity>();

  currentMilestone: MilestoneEntity;
  paginatedMilestones: MilestoneEntity[];
  closeResult: string;
  page: number;
  limit = 5;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
    this.page = 1;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.milestones) {
      this.paginatedMilestones = this.milestones.slice(0, this.limit);
    }
  }

  /**
   * We will paginate
   * @param {number} page
   */
  paginate(page: number) {
    // TODO ALH: Reimplement
    // let latest: any;
    //
    // // Check for first page
    // if (page === 1) {
    //   latest = this.allMilestones[0];
    //   // Get a hold of last element on current page
    // } else {
    //   latest = this.allMilestones[(page - 1) * this.limit];
    // }
    //
    // // Paginate from last element on current page
    // this.categoryService.getCategoriesPaginated(this.limit, latest).subscribe(paginatedCategories => {
    //   this.paginatedCategories = paginatedCategories;
    // });
  }

  /**
   * When a milestone is clicked, emit update
   */
  onMilestoneSelected(milestone: MilestoneEntity) {
    this.milestoneSelected.emit(milestone);
  }

  /**
   * Open modal
   */
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**
   * Check if user canceled modal
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
