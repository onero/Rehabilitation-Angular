import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'rehab-diagnosis',
  templateUrl: './diagnosis.component.html',
  styleUrls: ['./diagnosis.component.scss']
})
export class DiagnosisComponent implements OnInit {
  @Input()
  currentDiagnosis: string;
  editMode = false;

  constructor() {
  }

  ngOnInit() {
    this.currentDiagnosis = 'Bacon ipsum dolor amet biltong kielbasa turducken alcatra, turkey spare ribs buffalo venison capicola porchetta tail boudin cupim ball tip. Turducken flank pig chuck cupim. Burgdoggen boudin picanha turkey tenderloin sirloin, frankfurter t-bone spare ribs kielbasa leberkas chuck beef ribs. Pastrami tongue ball tip flank swine tenderloin jowl alcatra picanha venison chicken turkey. Landjaeger boudin brisket ball tip kielbasa tri-tip rump alcatra drumstick pork bacon frankfurter ham hock shoulder capicola.';
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  updateDiagnosis() {
    console.log(this.currentDiagnosis);
  }
}
