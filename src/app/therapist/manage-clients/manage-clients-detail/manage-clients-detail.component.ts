import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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

  @Output()
  clientDeleted = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  /**
   * Send request to delete currentClient
   */
  deleteClient() {
    this.clientDeleted.emit();
  }
}
