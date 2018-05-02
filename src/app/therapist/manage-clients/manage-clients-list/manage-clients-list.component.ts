import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ClientModel} from '../../../shared/entities/client.model';
import {Observable} from 'rxjs/Observable';
import {ClientService} from '../../../shared/services/client.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {AuthService} from '../../../auth/shared/auth.service';

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
  closeResult: string;
  page: number;
  limit = 5;

  constructor(private clientService: ClientService,
              private authService: AuthService,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.page = 1;
    this.clientService.getClients().subscribe(clients => {
      this.allClients = clients as ClientModel[];
      this.paginatedClients = this.allClients.slice(0, this.limit);
    });
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
    this.clientService.getClientsPaginated(this.limit, latest).subscribe(paginatedMessages => {
      this.paginatedClients = paginatedMessages;
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
   * Opens up the modal to add a new client.
   * @param content
   */
  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**
   * Adds a client to DB
   * @param clientName
   * @param clientAddress
   * @param clientPhone
   * @param clientEmail
   */
  addClient(clientName: string, clientAddress: string, clientPhone: string, clientEmail: string) {
    const newClient: ClientModel = {
      fullName: clientName,
      address: clientAddress,
      phone: clientPhone,
      email: clientEmail,
      rehabilitationPlan: {
        diagnosis: '',
        goal: ''
      }
    };
    this.authService.createClientAuthUser(newClient.email)
      .then(authUser => {
        // TODO MSP: Add message?
        newClient.uid = authUser.user.uid;
        this.clientService.createClient(newClient)
          .then(() => {
            // TODO Skovgaard: Add message to user.
          });
      });
  }

  /**
   * Method to dismiss the modal popup.
   * @param reason
   * @returns {string}
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
