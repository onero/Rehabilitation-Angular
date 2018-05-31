import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {ClientEntity} from '../../shared/entities/client.entity';
import {ClientService} from '../../shared/services/firestore/client.service';
import {MilestoneEntity} from '../../shared/entities/milestone.entity';
import {VisitEntity} from '../../shared/entities/visit.entity';
import {MilestoneService} from '../../shared/services/firestore/milestone.service';
import {MessageService} from '../../shared/services/message.service';

@Component({
  selector: 'rehab-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.scss']
})
export class ManageClientsComponent implements OnInit, OnDestroy {

  NO_SELECTED_VISIT_INDEX = -1;

  selectedClient: ClientEntity;
  selectedMilestoneUid: string;
  selectedVisitIndex: number;
  evaluationMode = false;

  $subscribe;

  constructor(private milestoneService: MilestoneService) {
    this.selectedVisitIndex = this.NO_SELECTED_VISIT_INDEX;
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    if (this.$subscribe) {
      this.$subscribe.unsubscribe();
    }
  }

  /**
   * Load all milestones into client
   */
  loadClientMilestones() {
    this.$subscribe = this.milestoneService.getMilestonesByClientUid(this.selectedClient.uid)
      .subscribe(milestonesFromDB => {
        this.selectedClient.rehabilitationPlan.milestones = milestonesFromDB;
      });
  }

  /**
   * Add new milestone to firestore
   * @param {MilestoneEntity} newMilestone
   */
  addMilestone(newMilestone: MilestoneEntity) {
    this.milestoneService.addMilestoneWithClientUid(this.selectedClient.uid, newMilestone);
  }

  /**
   * Add new visit to selectedMilestone
   * @param {VisitEntity} newVisit
   */
  addVisitToMilestone(newVisit: VisitEntity) {
    const currentMilestone = this.getCurrentMilestone();
    // Check visits for layer 8 error!
    if (currentMilestone.visits == null) {
      currentMilestone.visits = [];
    }
    // Add visit to milestone
    currentMilestone.visits.push(newVisit);
    // Update milestone on firestore with new data
    this.milestoneService.updateMilestone(currentMilestone);
  }

  /**
   * Retrieve current milestone from selected client
   * @returns {T | undefined}
   */
  private getCurrentMilestone() {
    return this.selectedClient.rehabilitationPlan.milestones
      .find(milestoneFromList => milestoneFromList.uid === this.selectedMilestoneUid);
  }

  /**
   * Remove visit from milestone
   */
  removeVisitFromMilestone() {
    // Hide EvaluationDetail
    this.selectedVisitIndex = this.NO_SELECTED_VISIT_INDEX;
    const currentMilestone = this.getCurrentMilestone();
    // Remove visit from milestone
    currentMilestone.visits.splice(this.selectedVisitIndex, 1);
    // Update milestone on firestore
    this.milestoneService.updateMilestone(currentMilestone);
  }

  /**
   * Updates the milestone for the client.
   * @param {MilestoneEntity} milestoneToUpdate
   */
  updateMilestone(milestoneToUpdate: MilestoneEntity) {
    this.milestoneService.updateMilestone(milestoneToUpdate);
  }

  /**
   * Change evaluation mode
   */
  setEvaluationMode(shouldBeEvaluation: boolean) {
    this.evaluationMode = shouldBeEvaluation;
    this.selectedVisitIndex = -1;
    this.selectedMilestoneUid = null;
  }

  onSelectedMilestone(milestoneUid: string) {
    this.selectedMilestoneUid = milestoneUid;
    this.selectedVisitIndex = this.NO_SELECTED_VISIT_INDEX;
  }

  onSelectedVisit(visitIndex: number) {
    this.selectedVisitIndex = visitIndex;
  }

  onClientSelected(client: ClientEntity) {
    this.selectedClient = client;
  }

}
