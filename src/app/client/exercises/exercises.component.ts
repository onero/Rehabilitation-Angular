import {Component, EventEmitter, OnInit} from '@angular/core';

@Component({
  selector: 'rehab-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {
  currentVideoId: string;

  constructor() {
  }

  ngOnInit() {
    // TODO ALH: Dynamically insert videoID!
    this.currentVideoId = '8GI7pzelfJk';
  }

}
