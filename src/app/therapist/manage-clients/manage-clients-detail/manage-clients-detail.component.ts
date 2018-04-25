import { Component, Input, OnInit } from '@angular/core';
import { ClientModel } from '../../shared/client.model';

@Component({
  selector: 'rehab-manage-clients-detail',
  templateUrl: './manage-clients-detail.component.html',
  styleUrls: ['./manage-clients-detail.component.scss']
})
export class ManageClientsDetailComponent implements OnInit {

  @Input()
  currentClient: ClientModel;

  constructor() { }

  ngOnInit() {
  }

}
