import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ClientEntity} from '../../../../shared/entities/client.entity';
import {VisitEntity} from '../../../../shared/entities/visit.entity';
import {RehabModalService} from '../../../../shared/services/rehab-modal.service';
import {environment} from '../../../../../environments/environment';
import {MilestoneEntity} from '../../../../shared/entities/milestone.entity';
import {Observable} from 'rxjs/Observable';
import {MilestoneService} from '../../../../shared/services/firestore/milestone.service';

@Component({
  selector: 'rehab-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.scss']
})
export class VisitListComponent implements OnInit, OnChanges {

  @Output()
  visitSelected = new EventEmitter<number>();
  @Output()
  visitAdded = new EventEmitter<VisitEntity>();
  @Input()
  selectedMilestoneUid: string;
  selectedVisitIndex: number;
  $loadedMilestone: Observable<MilestoneEntity>;

  allowEdit = !environment.clientMode;

  constructor(public modalService: RehabModalService,
              private milestoneService: MilestoneService) { }

  ngOnInit() {
    this.$loadedMilestone = this.milestoneService.getMilestoneById(this.selectedMilestoneUid);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.selectedVisitIndex = null;
    this.$loadedMilestone = this.milestoneService.getMilestoneById(this.selectedMilestoneUid);
  }

  /**
   * Add a new visit to the milestone
   * @param {string} visitNote
   */
  addVisit(visitNote: string) {
    const newVisit: VisitEntity = {
      note: visitNote,
      date: new Date()
    };
    this.visitAdded.emit(newVisit);
  }

  /**
   * Gets the information when the visit is selected
   * @param visitIndex
   */
  onVisitSelected(visitIndex: number) {
    this.selectedVisitIndex = visitIndex;
    // Grab index of selected visit to emit.
    this.visitSelected.emit(visitIndex);
  }

}
