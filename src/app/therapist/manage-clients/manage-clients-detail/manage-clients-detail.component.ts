import { Component, Input, OnInit } from '@angular/core';
import { ClientModel } from '../../shared/client.model';
import {ClientService} from '../../../shared/services/client.service';

@Component({
  selector: 'rehab-manage-clients-detail',
  templateUrl: './manage-clients-detail.component.html',
  styleUrls: ['./manage-clients-detail.component.scss']
})
export class ManageClientsDetailComponent implements OnInit {

  @Input()
  currentClient: ClientModel;

  constructor(private clientService: ClientService) { }

  ngOnInit() {
  }

  /**
   * Delete the current client
   */
  deleteClient() {
    this.clientService.deleteClient(this.currentClient);
  }
}
