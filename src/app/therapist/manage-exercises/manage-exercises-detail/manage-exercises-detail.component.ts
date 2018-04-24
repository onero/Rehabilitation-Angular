import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExerciseModel} from '../../../client/shared/exercise.model';
import {ExerciseService} from '../../../shared/services/exercise.service';

@Component({
  selector: 'rehab-manage-exercises-detail',
  templateUrl: './manage-exercises-detail.component.html',
  styleUrls: ['./manage-exercises-detail.component.scss']
})
export class ManageExercisesDetailComponent implements OnInit {
  @Input()
  currentExercise: ExerciseModel;

  @Output()
  deletedExercise = new EventEmitter();

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
  }

  deleteExercise() {
    this.exerciseService.deleteExercise(this.currentExercise)
      .then(() => {
        this.deletedExercise.emit();
      });
  }
}
