import { Component, OnInit } from '@angular/core';
import {ExerciseModel} from '../../client/shared/exercise.model';
import {Router} from '@angular/router';

@Component({
  selector: 'rehab-manage-exercises',
  templateUrl: './manage-exercises.component.html',
  styleUrls: ['./manage-exercises.component.scss']
})
export class ManageExercisesComponent implements OnInit {
  selectedExercise: ExerciseModel;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addExercise() {
    this.router.navigateByUrl('therapist/exercises/new');
  }
}
