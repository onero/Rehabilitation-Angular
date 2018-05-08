import {Component, Input, OnInit} from '@angular/core';
import {VisitEntity} from '../../../../shared/entities/visit.entity';

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

  constructor() { }

  ngOnInit() {
  }

}
