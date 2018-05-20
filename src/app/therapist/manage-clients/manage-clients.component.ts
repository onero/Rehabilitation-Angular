import {Component, OnInit} from '@angular/core';
import {ClientEntity} from '../../shared/entities/client.entity';
import {ClientService} from '../../shared/services/firestore/client.service';
import { AuthService } from '../../auth/shared/auth.service';
import {MilestoneEntity} from '../../shared/entities/milestone.entity';
import {VisitEntity} from '../../shared/entities/visit.entity';
import {MilestoneService} from '../../shared/services/firestore/milestone.service';

@Component({
  selector: 'rehab-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.scss']
})
export class ManageClientsComponent implements OnInit {
  selectedClient: ClientEntity;
  milestones: MilestoneEntity[];
  selectedMilestone: MilestoneEntity;
  currentVisit: VisitEntity;
  evaluationMode = false;

  constructor(private clientService: ClientService,
              private milestoneService: MilestoneService,
              private authService: AuthService) { }

  ngOnInit() { }

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
   * Add new milestone to firestore
   * @param {MilestoneEntity} newMilestone
   */
  addMilestone(newMilestone: MilestoneEntity) {
    this.milestoneService.addMilestoneWithClientUid(this.selectedClient.uid, newMilestone)
      .then(() => {
        this.resetCurrentMilestoneSelection();
      });
  }

  /**
   * Reset the current selected milestone
   */
  // TODO ALH: Refactor this!
  private resetCurrentMilestoneSelection() {
    this.selectedMilestone = null;
    this.currentVisit = null;
  }

  /**
   * Add new visit to selectedMilestone
   * @param {VisitEntity} newVisit
   */
  addVisitToMilestone(newVisit: VisitEntity) {
    // Check for visits in selected milestone
    if (!this.selectedMilestone.visits) {
      this.selectedMilestone.visits = [];
    }
    this.selectedMilestone.visits.push(newVisit);
    // Update milestone on firestore with new data
    this.milestoneService.updateMilestone(this.selectedMilestone)
      .then(() => {
        // Reset view afterwards
        this.selectedMilestone = null;
        this.currentVisit = null;
      });
  }

  removeVisitFromMilestone() {
    const indexOfVisitToRemove = this.selectedMilestone.visits.indexOf(this.currentVisit);
    this.selectedMilestone.visits.splice(indexOfVisitToRemove, 1);
    this.milestoneService.updateMilestone(this.selectedMilestone)
      .then(() => {
          // Reset view afterwards
        // TODO ALH: Refactor
          this.selectedMilestone = null;
          this.currentVisit = null;
      });
  }

  /**
   * Updates the milestone for the client.
   * @param {MilestoneEntity} milestoneToUpdate
   */
  updateMilestone(milestoneToUpdate: MilestoneEntity) {
    this.selectedMilestone.title = milestoneToUpdate.title;
    this.selectedMilestone.purpose = milestoneToUpdate.purpose;

    // Finds the index of the updated visit.
    const indexOfVisitToUpdate = this.selectedMilestone.visits.indexOf(milestoneToUpdate.visits[0]);

    // Find updated visit.
    const visitToUpdate = this.selectedMilestone.visits[indexOfVisitToUpdate];

    // Updates the visit.
    visitToUpdate.note = milestoneToUpdate.visits[0].note;

    this.milestoneService.updateMilestone(this.selectedMilestone)
      .then(() => {
      });
  }

  /**
   * Delete selectedClient!
   */
  deleteClient() {
    this.authService.deleteUser(this.selectedClient);
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

  onSelectedMilestone(milestone: MilestoneEntity) {
    this.selectedMilestone = milestone;
    this.currentVisit = null;
  }

}
