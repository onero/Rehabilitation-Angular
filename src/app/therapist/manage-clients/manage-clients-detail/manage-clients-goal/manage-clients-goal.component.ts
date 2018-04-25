import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rehab-manage-clients-goal',
  templateUrl: './manage-clients-goal.component.html',
  styleUrls: ['./manage-clients-goal.component.scss']
})
export class ManageClientsGoalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  /**
   * Edit btn will change the view to be editable.
   */
  editGoal() {
    console.log('New goal new goal new goal!');
  }
}
