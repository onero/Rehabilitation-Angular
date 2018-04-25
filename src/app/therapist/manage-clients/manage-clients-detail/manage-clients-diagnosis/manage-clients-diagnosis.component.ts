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
    // TODO ALH: Replace!
    this.currentDiagnosis = 'Bacon ipsum dolor amet biltong kielbasa turducken alcatra, turkey spare ribs buffalo venison capicola porchetta tail boudin cupim ball tip. Turducken flank pig chuck cupim. Burgdoggen boudin picanha turkey tenderloin sirloin, frankfurter t-bone spare ribs kielbasa leberkas chuck beef ribs. Pastrami tongue ball tip flank swine tenderloin jowl alcatra picanha venison chicken turkey. Landjaeger boudin brisket ball tip kielbasa tri-tip rump alcatra drumstick pork bacon frankfurter ham hock shoulder capicola.';
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
