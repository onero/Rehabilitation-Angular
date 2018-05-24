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
  }

  ngOnChanges(changes: SimpleChanges): void {
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
