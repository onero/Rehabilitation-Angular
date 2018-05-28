import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ClientEntity} from '../../../shared/entities/client.entity';
import {Observable} from 'rxjs/Observable';
import {ClientService} from '../../../shared/services/firestore/client.service';
import {AuthService} from '../../../auth/shared/auth.service';
import {RehabErrorService} from '../../../shared/services/rehab-error.service';
import {RehabModalService} from '../../../shared/services/rehab-modal.service';
import 'rxjs/add/operator/find';
import {MessageService} from '../../../shared/services/message.service';

@Component({
  selector: 'rehab-manage-clients-list',
  templateUrl: './manage-clients-list.component.html',
  styleUrls: ['./manage-clients-list.component.scss']
})
export class ManageClientsListComponent implements OnInit {

  @Output()
  clientSelected = new EventEmitter<ClientEntity>();

  currentClient: ClientEntity;
  $paginatedClients: Observable<ClientEntity[]>;
  amountOfClients: number;
  page = 1;
  limit = 5;

  constructor(private clientService: ClientService,
              private authService: AuthService,
              private rehabErrorService: RehabErrorService,
              public modalService: RehabModalService,
              private messageService: MessageService) {
  }

  ngOnInit() {
    this.paginate(this.page);
  }

  /**
   * We will paginate
   * @param {number} page
   */
  paginate(page: number) {
    this.setAmountOfClients();
    // Check for first page
    if (page === 1) {
      this.paginateFromBeginningOfCollection();
      // Get a hold of last element on current page
    } else {
      this.page = page;
      this.paginateFromPage(this.page);
    }
  }

  /**
   * Get amount of all exercises in firestore collection
   */
  private setAmountOfClients() {
    this.clientService.getAmountOfClients()
      .take(1)
      .subscribe(amount => this.amountOfClients = amount);
  }

  /**
   * When on page 1 we just get the first {{this.limit}} clients
   */
  private paginateFromBeginningOfCollection() {
    this.$paginatedClients = this.clientService.getClientsPaginated(this.limit);
  }

  /**
   * Start paginating from provided page
   * @param {number} page
   */
  private paginateFromPage(page: number) {
    // Update page number for paginator
    this.page = page;
    // Get amount of all clients in firestore collection
    this.$paginatedClients = this.$paginatedClients
      .map(paginatedClients => {
        // Get a hold of last element in current observable collection
        return paginatedClients[this.limit - 1];
      })
      .switchMap(latestClient =>
        // Get observable collection starting after last clients in old observable collection
        this.clientService.getClientsPaginated(this.limit, latestClient));
  }

  /**
   * Gets the information when the client is selected
   * @param {ClientEntity} client
   */
  onClientSelected(client: ClientEntity) {
    this.currentClient = client;
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
    const newClient: ClientEntity = {
      fullName: clientName,
      address: clientAddress,
      phone: clientPhoneAsString,
      email: clientEmail,
      rehabilitationPlan: {
        diagnosis: '',
        goal: ''
      }
    };
    this.authService.createClientAuthUser(newClient.email)
      .then(authUser => {
        newClient.uid = authUser.user.uid;
        this.clientService.createClient(newClient)
          .then(() => {
            this.messageService.displayMessage(`${newClient.fullName} has been created`, 2);
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
      // Get all clients to search through
      this.$paginatedClients = this.clientService.getClients()
        .map(clients => {
          // Filter on attributes from client
          const filteredClients = clients.filter((client: ClientEntity) => {
            // Check if client has
            return client.fullName.includes(query) || // Name.
              client.address.includes(query) || // Address.
              client.email.includes(query); // Email.
          });
          // Update paginated amount of exercises to result amount
          this.amountOfClients = filteredClients.length;
          return filteredClients;
        });
    } else {
      // User cleared search field, so we reset to list of paginated exercises
      this.paginate(1);
    }
  }

}
