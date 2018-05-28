import {Component, Input, OnInit} from '@angular/core';
import {ExerciseEntity} from '../../../shared/entities/exercise.entity';
import {ExerciseService} from '../../../shared/services/firestore/exercise.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'rehab-exercise-information',
  templateUrl: './exercise-information.component.html',
  styleUrls: ['./exercise-information.component.scss']
})
export class ExerciseInformationComponent implements OnInit {

  @Input()
  exerciseUid: string;

  $loadedExercise: Observable<ExerciseEntity>;

  constructor(private exerciseService: ExerciseService) {
  }

  ngOnInit() {
    this.$loadedExercise = this.exerciseService.getExerciseById(this.exerciseUid);
  }
}
