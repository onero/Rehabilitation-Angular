import {Component, Input, OnInit} from '@angular/core';
import {ClientModel} from '../../therapist/shared/client.model';

@Component({
  selector: 'rehab-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  clientFromUser: ClientModel;

  constructor() {
  }

  ngOnInit() {
    // TODO MSP Get user/client from db
    this.clientFromUser = {
      fullName: 'Mathias Test Plougmann',
      email: 'mathiasplougmann@test.dk',
      address: 'Testvej 25, 6700 Esbjerg',
      phone: '12345678'
    };
  }


}
