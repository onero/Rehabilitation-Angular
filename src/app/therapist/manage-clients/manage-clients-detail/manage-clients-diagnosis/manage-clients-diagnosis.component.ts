import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'rehab-manage-clients-diagnosis',
  templateUrl: './manage-clients-diagnosis.component.html',
  styleUrls: ['./manage-clients-diagnosis.component.scss']
})
export class ManageClientsDiagnosisComponent implements OnInit {

  clientMode = environment.clientMode;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Edit btn will change the view to be editable.
   */
  editDiagnosis() {
    console.log('EDIT THIS SHEIT!');
  }
}
