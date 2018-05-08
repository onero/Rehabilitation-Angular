import {Component, OnInit} from '@angular/core';
import {ClientModel} from '../../shared/entities/client.model';
import {ClientService} from '../../shared/services/client.service';
import { AuthService } from '../../auth/shared/auth.service';

@Component({
  selector: 'rehab-manage-clients',
  templateUrl: './manage-clients.component.html',
  styleUrls: ['./manage-clients.component.scss']
})
export class ManageClientsComponent implements OnInit {
  selectedClient: ClientModel;

  constructor(private clientService: ClientService,
              private authService: AuthService) { }


  ngOnInit() {
  }

  /**
   * Delete selectedClient!
   */
  deleteClient() {
    this.authService.deleteUser(this.selectedClient);
  }

}
