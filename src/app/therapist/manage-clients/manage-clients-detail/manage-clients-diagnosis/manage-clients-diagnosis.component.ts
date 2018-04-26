import {environment} from '../../../../../environments/environment';
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'rehab-manage-clients-diagnosis',
  templateUrl: './manage-clients-diagnosis.component.html',
  styleUrls: ['./manage-clients-diagnosis.component.scss']
})
export class ManageClientsDiagnosisComponent implements OnInit {

  @Input()
  currentDiagnosis: string;

  @Output()
  diagnosisUpdated = new EventEmitter<string>();

  clientMode = environment.clientMode;
  editMode = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  /**
   * Send out word that diagnosis has been updated!
   */
  onDiagnosisUpdated() {
    this.diagnosisUpdated.emit(this.currentDiagnosis);
    this.editMode = false;
  }
}
