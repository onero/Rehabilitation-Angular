import {Component, OnInit, ViewChild} from '@angular/core';
import {ExerciseModel} from '../../client/shared/exercise.model';
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

  constructor() { }

  ngOnInit() {
  }

  updateList(categoryName: string) {
    this.childExerciseList.updateList(categoryName);
  }
}
