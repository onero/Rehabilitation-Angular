import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { environment } from '../../../../../environments/environment';

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

  editMode = false;

  allowEdit = !environment.clientMode;

  constructor() {
  }

  ngOnInit() {
  }

  /**
   * Change the edit mode when clicked.
   */
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
