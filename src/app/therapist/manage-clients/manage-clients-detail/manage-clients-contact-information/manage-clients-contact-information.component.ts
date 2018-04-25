import { Component, Input, OnInit } from '@angular/core';
import { ClientModel } from '../../../shared/client.model';

@Component({
  selector: 'rehab-manage-clients-contact-information',
  templateUrl: './manage-clients-contact-information.component.html',
  styleUrls: ['./manage-clients-contact-information.component.scss']
})
export class ManageClientsContactInformationComponent implements OnInit {

  @Input()
  currentModel: ClientModel;

  constructor() { }

  ngOnInit() {}

  /**
   * Updates the client contact information
   * @param {ClientModel} newClient
   */
  public updateClientContactInformation(newClient: ClientModel) {
    this.currentModel = newClient;
  }

  /**
   * Edit btn will change the view to be editable.
   */
  editContactInformation() {
    console.log('EDIT EDIT EDIT!');
  }
}
