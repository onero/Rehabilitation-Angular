import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ClientModel} from '../../../shared/entities/client.model';
import {Observable} from 'rxjs/Observable';
import {ClientService} from '../../../shared/services/client.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../auth/shared/auth.service';
import {RehabErrorService} from '../../../shared/services/rehab-error.service';
import {RehabModalService} from '../../../shared/services/rehab-modal.service';

@Component({
  selector: 'rehab-manage-clients-list',
  templateUrl: './manage-clients-list.component.html',
  styleUrls: ['./manage-clients-list.component.scss']
})
export class ManageClientsListComponent implements OnInit {

  @Output()
  clientSelected = new EventEmitter<ClientModel>();
  currentClient: ClientModel;
  allClients: ClientModel[];
  paginatedClients: ClientModel[];
  page: number;
  limit = 5;

  constructor(private clientService: ClientService,
              private authService: AuthService,
              private rehabErrorService: RehabErrorService,
              public modalService: RehabModalService) {
  }

  ngOnInit() {
    this.page = 1;
    // This subscribe will trigger each time information is updated!
    this.clientService.getClients().subscribe(clients => {
      // If a current client is selected we will update it with new info
      this.updateSelectedClient(clients);
      this.allClients = clients as ClientModel[];
      this.paginatedClients = this.allClients.slice(0, this.limit);
    });
  }

  /**
   * Update currently selected client
   * @param clients
   */
  private updateSelectedClient(clients) {
    // Check for a selected client
    if (this.currentClient) {
      this.currentClient = clients.find(client => client.uid === this.currentClient.uid);
    }
  }

  /**
   * We will paginate
   * @param {number} page
   */
  paginate(page: number) {
    let latest: any;

    // Check for first page
    if (page === 1) {
      latest = this.allClients[0];
      // Get a hold of last element on current page
    } else {
      latest = this.allClients[(page - 1) * this.limit];
    }

    // Paginate from last element on current page
    this.clientService.getClientsPaginated(this.limit, latest).subscribe(paginatedClients => {
      this.paginatedClients = paginatedClients;
    });
  }

  /**
   * Gets the information when the client is selected
   * @param {ClientModel} client
   */
  onClientSelected(client: ClientModel) {
    this.clientSelected.emit(client);
  }

  /**
   * Adds a client to DB
   * @param clientName
   * @param clientAddress
   * @param clientPhone
   * @param clientEmail
   */
  addClient(clientName: string, clientAddress: string, clientPhone, clientEmail: string) {
    const clientPhoneAsString = `${clientPhone}`;
    const newClient: ClientModel = {
      fullName: clientName,
      address: clientAddress,
      phone: clientPhoneAsString,
      email: clientEmail,
      rehabilitationPlan: {
        diagnosis: '',
        goal: '',
        exerciseIds: []
      }
    };
    this.authService.createClientAuthUser(newClient.email)
      .then(authUser => {
        newClient.uid = authUser.user.uid;
        this.clientService.createClient(newClient)
          .then(() => {
            // TODO Skovgaard: Add message to user.
          });
      })
      .catch(error => {
        this.rehabErrorService.displayError(error.message);
      });
  }

  /**
   * Search.
   * @param {string} query
   */
  clientSearch(query: string) {
    // Check if user entered text or cleared search
    if (query.length > 0) {
      this.paginatedClients = [];
      const queriedClients = this.allClients.filter(client => {
        // Check if client has
        return client.fullName.includes(query) || // Name.
          client.address.includes(query) || // Address.
          client.phone.includes(query) || // Phone number.
          client.email.includes(query); // Email.
      });
      this.paginatedClients = queriedClients;
    } else {
      // Reset to list of paginated exercises
      this.paginatedClients = this.allClients.slice(0, this.limit);
    }
  }

}
