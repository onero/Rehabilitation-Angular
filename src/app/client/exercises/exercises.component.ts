import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rehab-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
  currentVideoId: string;

  constructor() { }

  ngOnInit() {
    this.currentVideoId = '8GI7pzelfJk';
  }

}
