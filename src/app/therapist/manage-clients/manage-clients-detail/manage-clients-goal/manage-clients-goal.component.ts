import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'rehab-manage-clients-goal',
  templateUrl: './manage-clients-goal.component.html',
  styleUrls: ['./manage-clients-goal.component.scss']
})
export class ManageClientsGoalComponent implements OnInit {

  @Input()
  currentGoal: string;

  @Output()
  goalUpdated = new EventEmitter<string>();

  editMode = false;

  constructor() { }

  ngOnInit() {
  }

  /**
   * Change save icon to edit icon and so on.
   */
  toggleGoalEdit() {
    this.editMode = !this.editMode;
  }

  /**
   * Tells when the update is called.
   */
  onGoalUpdated() {
    this.goalUpdated.emit(this.currentGoal);
    this.editMode = false;
  }
}
