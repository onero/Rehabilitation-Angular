import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rehab-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  institution;
  therapist;

  constructor() { }

  ngOnInit() {
    this.institution = {
      name: 'Sydvestjysk Sygehus',
      department: 'Terapeuterne',
      address: 'Finsensgade 35, 6700 Esbjerg',
      website: 'http://svs.dk/terapeuterne',
      email: 'terapeuterne@svs.dk',
      phone: '87 65 43 21'
    };
    this.therapist = {
      name: 'Lone Jensen',
      email: 'lone@svs.dk',
      contactHours: '9-15'
    };
  }

}
