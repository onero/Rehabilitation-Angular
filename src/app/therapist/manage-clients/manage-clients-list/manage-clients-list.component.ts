import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ClientModel } from '../../shared/client.model';
import { Observable } from 'rxjs/Observable';
import { ClientService } from '../../../shared/services/client.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'rehab-manage-clients-list',
  templateUrl: './manage-clients-list.component.html',
  styleUrls: ['./manage-clients-list.component.scss']
})
export class ManageClientsListComponent implements OnInit {

  @Output()
  clientSelected = new EventEmitter<ClientModel>();
  currentClient: ClientModel;
  $clients: Observable<any[]>;
  closeResult: string;

  constructor(private clientService: ClientService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.$clients = this.clientService.getClients();
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
      email: clientEmail
    };
    this.clientService.createClient(newClient)
      .then(() => {
      // TODO Skovgaard: Add message to user.
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
      return  `with: ${reason}`;
    }
  }
}
