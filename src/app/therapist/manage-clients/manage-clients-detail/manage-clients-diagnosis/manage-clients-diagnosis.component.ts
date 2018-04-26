import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'rehab-manage-clients-diagnosis',
  templateUrl: './manage-clients-diagnosis.component.html',
  styleUrls: ['./manage-clients-diagnosis.component.scss']
})
export class ManageClientsDiagnosisComponent implements OnInit {
  @Input()
  currentDiagnosis: string;
  editMode = false;

  constructor() {
  }

  ngOnInit() {
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  updateDiagnosis() {
    // TODO ALH: Replace!
    console.log(this.currentDiagnosis);
    this.editMode = false;
  }
}
