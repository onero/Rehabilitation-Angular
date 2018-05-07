import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientModel} from '../../../../shared/entities/client.model';
import {ClientService} from '../../../../shared/services/client.service';

@Component({
  selector: 'rehab-manage-clients-contact-information',
  templateUrl: './manage-clients-contact-information.component.html',
  styleUrls: ['./manage-clients-contact-information.component.scss']
})
export class ManageClientsContactInformationComponent implements OnInit {

  @Input()
  currentModel: ClientModel;

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
   * @param {ClientModel} newClient
   */
  public updateClientContactInformation() {
    this.clientService.updateClient(this.currentModel)
    this.editMode = false;
  }

}
