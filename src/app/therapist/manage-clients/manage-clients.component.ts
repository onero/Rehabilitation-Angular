import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
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
export class ManageClientsComponent implements OnInit, OnChanges {

  selectedClient: ClientEntity;
  milestones: MilestoneEntity[];
  selectedMilestoneUid: string;
  selectedVisitIndex: number;
  evaluationMode = false;

  constructor(private clientService: ClientService,
              private milestoneService: MilestoneService,
              private messageService: MessageService) {
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.selectedMilestoneUid);
    console.log(this.selectedVisitIndex);
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
   * Add new milestone to firestore
   * @param {MilestoneEntity} newMilestone
   */
  addMilestone(newMilestone: MilestoneEntity) {
    this.milestoneService.addMilestoneWithClientUid(this.selectedClient.uid, newMilestone);
  }

  // /**
  //  * Add new visit to selectedMilestone
  //  * @param {VisitEntity} newVisit
  //  */
  // addVisitToMilestone(newVisit: VisitEntity) {
  //   // Check for visits in selected milestone
  //   if (!this.selectedMilestone.visits) {
  //     this.selectedMilestone.visits = [];
  //   }
  //   this.selectedMilestone.visits.push(newVisit);
  //   // Update milestone on firestore with new data
  //   this.milestoneService.updateMilestone(this.selectedMilestone);
  // }
  //
  // removeVisitFromMilestone() {
  //   const indexOfVisitToRemove = this.selectedMilestone.visits.indexOf(this.selectedVisitIndex);
  //   this.selectedMilestone.visits.splice(indexOfVisitToRemove, 1);
  //   this.milestoneService.updateMilestone(this.selectedMilestone);
  // }
  //
  // /**
  //  * Updates the milestone for the client.
  //  * @param {MilestoneEntity} milestoneToUpdate
  //  */
  // updateMilestone(milestoneToUpdate: MilestoneEntity) {
  //   this.selectedMilestone.title = milestoneToUpdate.title;
  //   this.selectedMilestone.purpose = milestoneToUpdate.purpose;
  //
  //   // Finds the index of the updated visit.
  //   const indexOfVisitToUpdate = this.selectedMilestone.visits.indexOf(milestoneToUpdate.visits[0]);
  //
  //   // Find updated visit.
  //   const visitToUpdate = this.selectedMilestone.visits[indexOfVisitToUpdate];
  //
  //   // Updates the visit.
  //   visitToUpdate.note = milestoneToUpdate.visits[0].note;
  //
  //   this.milestoneService.updateMilestone(this.selectedMilestone)
  //     .then(() => {
  //     });
  // }

  /**
   * Delete selectedClient!
   */
  deleteClient() {
    this.clientService.deleteClient(this.selectedClient)
      .then(() => {
        this.messageService.displayMessage(`${this.selectedClient.fullName} is now deleted...`, 2);
        this.selectedClient = null;
      });
  }

  /**
   * Change evaluation mode
   */
  setEvaluationMode(shouldBeEvaluation: boolean) {
    this.evaluationMode = shouldBeEvaluation;
  }

  onSelectedMilestone(milestoneUid: string) {
    this.selectedMilestoneUid = milestoneUid;
    // this.selectedVisitIndex = null;
  }

  onSelectedVisit(visitIndex: number) {
    this.selectedVisitIndex = visitIndex;
  }

}
