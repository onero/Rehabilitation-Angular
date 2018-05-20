import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/shared/auth.service';
import {MilestoneService} from '../../shared/services/firestore/milestone.service';
import {MilestoneEntity} from '../../shared/entities/milestone.entity';
import {VisitEntity} from '../../shared/entities/visit.entity';

@Component({
  selector: 'rehab-evaluation',
  templateUrl: './evaluation.component.html',
  styleUrls: ['./evaluation.component.scss']
})
export class EvaluationComponent implements OnInit {
  milestones: MilestoneEntity[];
  selectedMilestone: MilestoneEntity;
  currentVisit: VisitEntity;

  constructor(private authService: AuthService,
              private milestoneService: MilestoneService) {
  }

  ngOnInit() {
    const clientUid = this.authService.getUserId();
    this.milestoneService.getMilestonesByClientUid(clientUid)
      .subscribe(milestonesFromDB => {
        this.milestones = milestonesFromDB;
      });
  }


}
