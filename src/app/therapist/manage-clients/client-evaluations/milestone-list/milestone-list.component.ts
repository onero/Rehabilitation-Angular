import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MilestoneEntity} from '../../../../shared/entities/milestone.entity';
import 'rxjs/add/operator/take';
import {RehabModalService} from '../../../../shared/services/rehab-modal.service';
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

  constructor(public modalService: RehabModalService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Milestone list')
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
