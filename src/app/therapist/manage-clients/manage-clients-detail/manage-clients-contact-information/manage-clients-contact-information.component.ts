import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientEntity} from '../../../../shared/entities/client.entity';
import {ClientService} from '../../../../shared/services/firestore/client.service';

@Component({
  selector: 'rehab-manage-clients-contact-information',
  templateUrl: './manage-clients-contact-information.component.html',
  styleUrls: ['./manage-clients-contact-information.component.scss']
})
export class ManageClientsContactInformationComponent implements OnInit {

  @Input()
  selectedClient: ClientEntity;

  @Output()
  contactInfoUpdated = new EventEmitter();

  editMode = false;

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  /**
   * Updates the client contact information
   * @param {ClientEntity} newClient
   */
  public updateClientContactInformation() {
    this.clientService.updateClient(this.selectedClient);
    this.editMode = false;
  }

}
