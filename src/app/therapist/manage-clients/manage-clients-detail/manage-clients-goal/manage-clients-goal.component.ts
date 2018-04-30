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

  toggleGoalEdit() {
    this.editMode = !this.editMode;
  }

  onGoalUpdated() {
    this.goalUpdated.emit(this.currentGoal);
    this.editMode = false;
  }
}
