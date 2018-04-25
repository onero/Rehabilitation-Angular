import { Component, OnInit } from '@angular/core';
import { ClientModel } from '../shared/client.model';

@Component({
  selector: 'rehab-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.scss']
})
export class ManageClientsComponent implements OnInit {
  selectedClient: ClientModel;

  constructor() { }

  ngOnInit() {
  }

}
