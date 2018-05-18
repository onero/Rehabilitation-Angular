import {Component, OnInit, ViewChild} from '@angular/core';
import {ExerciseEntity} from '../../shared/entities/exercise.entity';
import {ManageExercisesListComponent} from './manage-exercises-list/manage-exercises-list.component';

@Component({
  selector: 'rehab-manage-exercises',
  templateUrl: './manage-exercises.component.html',
  styleUrls: ['./manage-exercises.component.scss']
})
export class ManageExercisesComponent implements OnInit {
  @ViewChild('exerciseList') childExerciseList: ManageExercisesListComponent;
  selectedCategory: string;
  selectedExercise: ExerciseEntity;

  constructor() { }

  ngOnInit() {
  }

  onSelectedCategory(selectedCategory: string) {
    this.selectedCategory = selectedCategory;
    this.selectedExercise = null;
    // Clear search field
    this.childExerciseList.searchValue = ' ';

  }
}
