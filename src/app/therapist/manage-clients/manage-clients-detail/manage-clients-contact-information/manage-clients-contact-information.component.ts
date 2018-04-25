import { Component, Input, OnInit } from '@angular/core';
import { ClientModel } from '../../../shared/client.model';

@Component({
  selector: 'rehab-manage-clients-contact-information',
  templateUrl: './manage-clients-contact-information.component.html',
  styleUrls: ['./manage-clients-contact-information.component.scss']
})
export class ManageClientsContactInformationComponent implements OnInit {

  @Input()
  clientModel: ClientModel;

  constructor() { }

  ngOnInit() {
    this.emptyClientContactInformation();
  }

  private emptyClientContactInformation() {
    this.clientModel = {
      fullName: 'Clients name',
      address: '',
      phone: '',
      email: ''
    };
  }

  public updateClientContactInformation(newClient: ClientModel) {
    this.clientModel = newClient;
  }

  editContactInformation() {
    console.log('EDIT EDIT EDIT!');
  }
}
