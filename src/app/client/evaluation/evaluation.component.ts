import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/shared/auth.service';
import {MilestoneService} from '../../shared/services/firestore/milestone.service';
import {MilestoneEntity} from '../../shared/entities/milestone.entity';

@Component({
  selector: 'rehab-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  NO_SELECTED_VISIT_INDEX = -1;

  milestones: MilestoneEntity[];
  selectedMilestoneUid: string;
  selectedVisitIndex: number;

  constructor(private authService: AuthService,
              private milestoneService: MilestoneService) {
  }

  ngOnInit() {
    // Make sure no visit is selected in beginning
    this.selectedVisitIndex = this.NO_SELECTED_VISIT_INDEX;

    const clientUid = this.authService.getUserId();
    this.milestoneService.getMilestonesByClientUid(clientUid)
      .subscribe(milestonesFromDB => {
        this.milestones = milestonesFromDB;
      });
  }

  onSelectedMilestone(milestoneUid: string) {
    this.selectedMilestoneUid = milestoneUid;
    this.selectedVisitIndex = this.NO_SELECTED_VISIT_INDEX;
  }

  onSelectedVisit(visitIndex: number) {
    this.selectedVisitIndex = visitIndex;
  }


}
