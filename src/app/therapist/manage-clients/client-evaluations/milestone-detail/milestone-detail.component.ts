import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { MilestoneEntity } from '../../../../shared/entities/milestone.entity';
import {MilestoneService} from '../../../../shared/services/firestore/milestone.service';
import {Observable} from 'rxjs/Observable';

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
  @Input()
  title: string;
  @Input()
  purpose: string;
  @Input()
  note: string;
  @Output()
  deletedVisit = new EventEmitter();

  $loadedMilestone: Observable<MilestoneEntity>;


  constructor(private milestoneService: MilestoneService) { }

  @Output()
  updateEvaluation = new EventEmitter<MilestoneEntity>();

  allowEdit = !environment.clientMode;

  editMode = false;

  ngOnInit() {
    console.log(this.milestoneUid);
    console.log(this.visitIndex);
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
  // onEvaluationUpdated() {
  //   this.currentVisit.note = this.note;
  //   const newMilestone: MilestoneEntity = {
  //     title: this.title,
  //     purpose: this.purpose,
  //     visits: []
  //   };
  //   newMilestone.visits.push(this.currentVisit);
  //   this.updateEvaluation.emit(newMilestone);
  //   this.editMode = false;
  // }

}
