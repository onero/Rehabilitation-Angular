import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {environment} from '../../../../../environments/environment';
import {MilestoneEntity} from '../../../../shared/entities/milestone.entity';
import {MilestoneService} from '../../../../shared/services/firestore/milestone.service';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

@Component({
  selector: 'rehab-milestone-detail',
  templateUrl: './milestone-detail.component.html',
  styleUrls: ['./milestone-detail.component.scss']
})
export class MilestoneDetailComponent implements OnInit {

  @Input()
  milestoneUid: string;
  @Input()
  visitIndex: number;

  @Output()
  deletedVisit = new EventEmitter();

  $loadedMilestone: Observable<MilestoneEntity>;

  constructor(private milestoneService: MilestoneService) {
  }

  @Output()
  updateMilestone = new EventEmitter<MilestoneEntity>();

  allowEdit = !environment.clientMode;

  editMode = false;

  ngOnInit() {
    this.$loadedMilestone = this.milestoneService.getMilestoneById(this.milestoneUid);
  }


  deleteVisit() {
    this.deletedVisit.emit();
  }

  /**
   * Change save icon to edit icon and so on.
   */
  toggleEvaluationEdit() {
    this.editMode = !this.editMode;
  }

  /**
   * Tells when the update is called.
   */
  onEvaluationUpdated(loadedMilestone: MilestoneEntity) {
    this.updateMilestone.emit(loadedMilestone);
    this.editMode = false;
  }

}
