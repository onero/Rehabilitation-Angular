import {Component, Input, OnInit} from '@angular/core';
import {ClientModel} from '../../../shared/client.model';
import {ClientService} from '../../../../shared/services/client.service';

@Component({
  selector: 'rehab-manage-clients-contact-information',
  templateUrl: './manage-clients-contact-information.component.html',
  styleUrls: ['./manage-clients-contact-information.component.scss']
})
export class ManageClientsContactInformationComponent implements OnInit {

  @Input()
  currentModel: ClientModel;

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
    this.clientService.updateClient(this.currentModel);
    this.editMode = false;
  }

}
