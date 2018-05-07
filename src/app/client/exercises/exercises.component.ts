import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {YoutubePlayerComponent} from './youtube-player/youtube-player.component';
import { ExerciseModel } from '../shared/exercise.model';
import { ExerciseInformationComponent } from './exercise-information/exercise-information.component';

@Component({
  selector: 'rehab-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  @Input()
  currentExercise: ExerciseModel;

  constructor() {
  }

  ngOnInit() {
  }

}
