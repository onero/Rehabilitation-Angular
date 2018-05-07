import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {MilestoneEntity} from '../../../../shared/entities/milestone.entity';

@Component({
  selector: 'rehab-milestone-list',
  templateUrl: './milestone-list.component.html',
  styleUrls: ['./milestone-list.component.scss']
})
export class MilestoneListComponent implements OnInit {

  @Output()
  milestoneSelected = new EventEmitter<MilestoneEntity>();
  currentMilestone: MilestoneEntity;
  allMilestones: MilestoneEntity[];
  paginatedMilestones: MilestoneEntity[];
  closeResult: string;
  page: number;
  limit = 5;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  //  TODO ALH: Replace
    this.page = 1;
    // this.categoryService.getCategories().subscribe(categories => {
    //   this.allCategories = categories;
    //   this.paginatedCategories = this.allCategories.slice(0, this.limit);
    // });
    this.allMilestones = [
      {
        uid: '1',
        title: 'Stir in pot',
        purpose: 'Be able to stir with right hand',
        visits: [
          {
            uid: '1',
            date: new Date(),
            note: "Didn't do sheit"
          }
        ]
      }
    ];
    this.paginatedMilestones = this.allMilestones.slice(0, this.limit);
  }

  /**
   * We will paginate
   * @param {number} page
   */
  paginate(page: number) {
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
   * When a category is clicked emit update
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
      return  `with: ${reason}`;
    }
  }

}
