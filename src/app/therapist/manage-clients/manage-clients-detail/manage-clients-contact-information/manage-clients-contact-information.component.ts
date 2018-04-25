import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rehab-manage-clients-contact-information',
  templateUrl: './manage-clients-contact-information.component.html',
  styleUrls: ['./manage-clients-contact-information.component.scss']
})
export class ManageClientsContactInformationComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  edit() {
    console.log('EDIT EDIT EDIT!');
  }
}
