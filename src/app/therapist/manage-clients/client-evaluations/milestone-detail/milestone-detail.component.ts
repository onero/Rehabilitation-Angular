import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {VisitEntity} from '../../../../shared/entities/visit.entity';
import { environment } from '../../../../../environments/environment';

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
  updateEvaluation = new EventEmitter<string>();

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
    this.updateEvaluation.emit(this.purpose);
    this.editMode = false;
  }
}
