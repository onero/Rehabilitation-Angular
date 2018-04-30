import {Component, OnInit, ViewChild} from '@angular/core';
import { ClientModel } from '../shared/client.model';
import {ClientService} from '../../shared/services/client.service';
import {ManageExercisesListComponent} from '../manage-exercises/manage-exercises-list/manage-exercises-list.component';
import {AssignExerciseComponent} from './manage-clients-detail/assign-exercise/assign-exercise.component';
import {ManageClientsDetailComponent} from './manage-clients-detail/manage-clients-detail.component';

@Component({
  selector: 'rehab-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.scss']
})
export class ManageClientsComponent implements OnInit {
  selectedClient: ClientModel;

  constructor(private clientService: ClientService) { }


  ngOnInit() {
  }

  /**
   * Delete selectedClient!
   */
  deleteClient() {
    this.clientService.deleteClient(this.selectedClient)
      .then(() => {
        this.selectedClient = null;
      });
  }

}
