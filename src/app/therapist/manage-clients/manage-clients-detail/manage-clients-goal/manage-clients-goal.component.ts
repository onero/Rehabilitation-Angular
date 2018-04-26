import {Component, OnInit} from '@angular/core';
import {environment} from '../../../../../environments/environment';

@Component({
  selector: 'rehab-manage-clients-goal',
  templateUrl: './manage-clients-goal.component.html',
  styleUrls: ['./manage-clients-goal.component.scss']
})
export class ManageClientsGoalComponent implements OnInit {

  clientMode = environment.clientMode;

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
