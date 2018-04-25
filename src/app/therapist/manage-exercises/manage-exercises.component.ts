import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ExerciseModel} from '../../client/shared/exercise.model';
import {Router} from '@angular/router';
import {YoutubePlayerComponent} from '../../client/exercises/youtube-player/youtube-player.component';
import {ManageExercisesListComponent} from './manage-exercises-list/manage-exercises-list.component';

@Component({
  selector: 'rehab-manage-exercises',
  templateUrl: './manage-exercises.component.html',
  styleUrls: ['./manage-exercises.component.scss']
})
export class ManageExercisesComponent implements OnInit {
  @ViewChild('exerciseList') childExerciseList: ManageExercisesListComponent;
  selectedCategory: string;
  selectedExercise: ExerciseModel;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  addExercise() {
    this.router.navigateByUrl('therapist/exercises/new');
  }

  updateList(categoryName: string) {
    this.childExerciseList.updateList(categoryName);
  }
}
