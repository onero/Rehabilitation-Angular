import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {VisitEntity} from '../../../../shared/entities/visit.entity';
import { environment } from '../../../../../environments/environment';
import { MilestoneEntity } from '../../../../shared/entities/milestone.entity';

@Component({
  selector: 'rehab-milestone-detail',
  templateUrl: './milestone-detail.component.html',
  styleUrls: ['./milestone-detail.component.scss']
})
export class MilestoneDetailComponent implements OnInit {

  @Input()
  title: string;
  @Input()
  purpose: string;
  @Input()
  note: string;

  @Input()
  currentVisit: VisitEntity;

  @Output()
  updateEvaluation = new EventEmitter<MilestoneEntity>();

  allowEdit = !environment.clientMode;

  editMode = false;

  constructor() { }

  ngOnInit() {
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
  onEvaluationUpdated() {
    this.currentVisit.note = this.note;
    const newMilestone: MilestoneEntity = {
      title: this.title,
      purpose: this.purpose,
      visits: []
    }
    newMilestone.visits.push(this.currentVisit);
    this.updateEvaluation.emit(newMilestone);
    this.editMode = false;
  }
}
