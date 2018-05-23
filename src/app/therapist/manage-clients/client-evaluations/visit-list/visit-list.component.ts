import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ClientEntity} from '../../../../shared/entities/client.entity';
import {VisitEntity} from '../../../../shared/entities/visit.entity';
import {RehabModalService} from '../../../../shared/services/rehab-modal.service';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'rehab-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.scss']
})
export class VisitListComponent implements OnInit, OnChanges {

  @Output()
  visitSelected = new EventEmitter<VisitEntity>();
  @Output()
  visitAdded = new EventEmitter<VisitEntity>();

  allowEdit = !environment.clientMode;

  @Input()
  allVisits: VisitEntity[];

  @Input()
  currentVisit: VisitEntity;

  constructor(public modalService: RehabModalService) {
  }

  ngOnInit() {
    // Check for exercises
    if (this.allVisits) {
      // Check for selected visit
      if (this.currentVisit) {
        // Locate updated visit
        const updatedVisit = this.allVisits
          .find(visit => visit.uid === this.currentVisit.uid);
        // Reselect visit
        this.visitSelected.emit(updatedVisit);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Visit list')
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
   * @param {ClientEntity} visit
   */
  onVisitSelected(visit: VisitEntity) {
    this.visitSelected.emit(visit);
  }

}
