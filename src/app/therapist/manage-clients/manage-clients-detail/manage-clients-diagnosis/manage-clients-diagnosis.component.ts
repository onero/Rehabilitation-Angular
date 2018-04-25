import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rehab-manage-clients-diagnosis',
  templateUrl: './manage-clients-diagnosis.component.html',
  styleUrls: ['./manage-clients-diagnosis.component.scss']
})
export class ManageClientsDiagnosisComponent implements OnInit {

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
