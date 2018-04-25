import { Component, OnInit } from '@angular/core';
import { ClientModel } from '../../shared/client.model';

@Component({
  selector: 'rehab-manage-clients-list',
  templateUrl: './manage-clients-list.component.html',
  styleUrls: ['./manage-clients-list.component.scss']
})
export class ManageClientsListComponent implements OnInit {

  clientsModel: ClientModel;

  constructor() { }

  ngOnInit() {
    this.mockClient1();
    this.mockClient2();
  }

  private mockClient1() {
    this.clientsModel = {
      fullName: 'Mathias Skovgaard',
      address: 'Amagervej 14, 6705 Esbjerg Ø',
      phone: '42752316',
      email: 'MathiasSkovgaardRasmussen@gmail.com'
    };
  }

  private mockClient2() {
    this.clientsModel = {
      fullName: 'Mathias Plougmann',
      address: 'Intetsted 15',
      phone: '1234',
      email: 'HrJensen@gmail.com'
    };
  }

  addClient() {
    console.log('Adding!!');
  }
}
