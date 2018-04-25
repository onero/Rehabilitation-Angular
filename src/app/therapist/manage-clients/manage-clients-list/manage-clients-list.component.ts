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

  onClientSelected(client: ClientModel) {
    this.clientSelected.emit(client);
  }

  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  addClient(clientName: string, clientAddress: string, clientPhone: string, clientEmail: string) {
    this.clientService.createClient(clientName, clientAddress, clientPhone, clientEmail)
      .then(() => {
      // TODO Skovgaard: Add message to user.
      });
  }

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
