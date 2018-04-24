import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rehab-manage-exercises',
  templateUrl: './manage-exercises.component.html',
  styleUrls: ['./manage-exercises.component.scss']
})
export class ManageExercisesComponent implements OnInit {
  exerciseSelected = false;

  constructor() { }

  ngOnInit() {
  }

  selectExercise() {
    this.exerciseSelected = true;
  }

}
