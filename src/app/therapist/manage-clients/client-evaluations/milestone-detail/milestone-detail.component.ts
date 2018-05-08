import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {VisitEntity} from '../../../../shared/entities/visit.entity';
import {MilestoneService} from '../../../../shared/services/milestone.service';

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
  deletedVisit = new EventEmitter();

  constructor(private milestoneService: MilestoneService) { }

  ngOnInit() {
  }

  deleteVisit() {
    this.deletedVisit.emit();
  }
}
