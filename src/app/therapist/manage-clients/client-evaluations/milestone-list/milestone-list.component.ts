import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MilestoneEntity} from '../../../../shared/entities/milestone.entity';
import 'rxjs/add/operator/take';
import {RehabModalService} from '../../../../shared/services/rehab-modal.service';
import {AuthService} from '../../../../auth/shared/auth.service';
import {environment} from '../../../../../environments/environment';

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
  @Output()
  milestoneCreated = new EventEmitter<MilestoneEntity>();

  allowEdit = !environment.clientMode;

  currentMilestone: MilestoneEntity;
  paginatedMilestones: MilestoneEntity[];
  page: number;
  limit = 5;

  constructor(public modalService: RehabModalService) {
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
    // TODO ALH: Remove if not used
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
   * Create new Milestone
   * @param {string} title
   * @param {string} purpose
   */
  addMilestone(title: string, purpose: string) {
    const newMilestone: MilestoneEntity = {
      title: title,
      purpose: purpose
    };
    // Inform "mother" about new milestone
    this.milestoneCreated.emit(newMilestone);
  }
}
