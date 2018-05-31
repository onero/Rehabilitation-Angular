import {Component, OnDestroy, OnInit} from '@angular/core';
import {ClientEntity} from '../../shared/entities/client.entity';
import {ClientService} from '../../shared/services/firestore/client.service';
import {AuthService} from '../../auth/shared/auth.service';

@Component({
  selector: 'rehab-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  clientFromUser: ClientEntity;
  $subscribe;

  constructor(private clientService: ClientService) {
  }

  ngOnInit() {
    this.saveClientToLocalStorage();
  }

  ngOnDestroy(): void {
    if (this.$subscribe) {
      this.$subscribe.unsubscribe();
    }
  }

  /**
   * Saves the client to the local storage, so the user wont login every time.
   */
  private saveClientToLocalStorage() {
    const uid = localStorage.getItem(AuthService.USER_ID_KEY);
    this.$subscribe = this.clientService.getCurrentClientById(uid)
      .subscribe(clientFromDB => {
        this.clientFromUser = clientFromDB as ClientEntity;
      });
  }
}
