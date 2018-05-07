import {Component, OnInit} from '@angular/core';
import {ClientModel} from '../../shared/entities/client.model';
import {ClientService} from '../../shared/services/client.service';
import {MilestoneEntity} from '../../shared/entities/milestone.entity';
import {VisitEntity} from '../../shared/entities/visit.entity';
import {MilestoneService} from '../../shared/services/milestone.service';

@Component({
  selector: 'rehab-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.scss']
})
export class ManageClientsComponent implements OnInit {
  selectedClient: ClientModel;
  milestones: MilestoneEntity[];
  selectedMilestone: MilestoneEntity;
  currentVisit: VisitEntity;

  evaluationMode = false;

  constructor(private clientService: ClientService,
              private milestoneService: MilestoneService) { }


  ngOnInit() {
  }

  /**
   * Load all milestones into client
   */
  loadClientMilestones() {
    this.milestoneService.getMilestonesByClientUid(this.selectedClient.uid)
      .subscribe(milestonesFromDB => {
        this.milestones = milestonesFromDB;
      });
  }

  /**
   * Delete selectedClient!
   */
  deleteClient() {
    this.clientService.deleteClient(this.selectedClient)
      .then(() => {
        this.selectedClient = null;
      });
  }

  /**
   * Change evaluation mode
   */
  setEvaluationMode(shouldBeEvaluation: boolean) {
    this.evaluationMode = shouldBeEvaluation;
  }

  /**
   * Make sure to reset everything on back clicked
   */
  resetData() {
    this.selectedClient = null;
    this.currentVisit = null;
    this.milestones = null;
    this.selectedMilestone = null;
  }
}
