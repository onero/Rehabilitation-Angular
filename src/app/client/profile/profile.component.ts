import {Component, Input, OnInit} from '@angular/core';
import {ClientModel} from '../../shared/entities/client.model';
import {ClientService} from '../../shared/services/client.service';
import {AuthService} from '../../auth/shared/auth.service';

@Component({
  selector: 'rehab-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  clientFromUser: ClientModel;

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
    const uid = localStorage.getItem(AuthService.CLIENT_ID_KEY);
    this.clientService.getCurrentClientById(uid)
      .subscribe(clientFromDB => {
        this.clientFromUser = clientFromDB as ClientModel;
      });
  }


}
