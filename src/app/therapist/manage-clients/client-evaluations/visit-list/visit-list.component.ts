import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ClientModel} from '../../../../shared/entities/client.model';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {VisitEntity} from '../../../../shared/entities/visit.entity';

@Component({
  selector: 'rehab-visit-list',
  templateUrl: './visit-list.component.html',
  styleUrls: ['./visit-list.component.scss']
})
export class VisitListComponent implements OnInit {

  @Output()
  visitSelected = new EventEmitter<VisitEntity>();

  @Input()
  allVisits: VisitEntity[];

  currentVisit: VisitEntity;
  paginatedVisits: VisitEntity[];
  closeResult: string;
  page: number;
  limit = 5;

  constructor(private modalService: NgbModal) {
  }

  ngOnInit() {
    this.page = 1;
    // This subscribe will trigger each time information is updated!
    // this.clientService.getClients().subscribe(clients => {
    //   // If a current client is selected we will update it with new info
    //   this.updateSelectedClient(clients);
    //   this.allClients = clients as ClientModel[];
    //   this.paginatedClients = this.allClients.slice(0, this.limit);
    // });
    this.paginatedVisits = this.allVisits.slice(0, this.limit);
  }

  addVisit(visitNote: string) {
  //  TODO ALH
  }

  /**
   * Gets the information when the visit is selected
   * @param {ClientModel} visit
   */
  onVisitSelected(visit: VisitEntity) {
    this.visitSelected.emit(visit);
  }

  /**
   * Opens up the modal to add a new visit.
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

  /**
   * We will paginate
   * @param {number} page
   */
  paginate(page: number) {
    // let latest: any;
    //
    // // Check for first page
    // if (page === 1) {
    //   latest = this.allClients[0];
    //   // Get a hold of last element on current page
    // } else {
    //   latest = this.allClients[(page - 1) * this.limit];
    // }
    //
    // // Paginate from last element on current page
    // this.clientService.getClientsPaginated(this.limit, latest).subscribe(paginatedClients => {
    //   this.paginatedClients = paginatedClients;
    // });
  }

}
