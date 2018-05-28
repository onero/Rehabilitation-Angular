import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExerciseEntity} from '../../../../shared/entities/exercise.entity';
import {RehabModalService} from '../../../../shared/services/rehab-modal.service';
import {Router} from '@angular/router';

@Component({
  selector: 'rehab-assign-exercise',
  templateUrl: './assign-exercise.component.html',
  styleUrls: ['./assign-exercise.component.scss']
})

export class AssignExerciseComponent implements OnInit {

  private MANAGE_EXERCISES_ROUTE = 'therapist/exercises';

  @Input()
  exercises: ExerciseEntity[];

  @Output()
  exerciseUnassigned = new EventEmitter<string>();

  @Output()
  exerciseAssigned = new EventEmitter<ExerciseEntity>();

  constructor(public modalService: RehabModalService,
              private router: Router) {
  }

  ngOnInit() {
  }

  /**
   * Unassign exercise from client
   * @param {string} uid
   */
  onExerciseUnassigned(uid: string) {
    this.exerciseUnassigned.emit(uid);
  }

  /**
   * Assign selected exercise
   * @param {ExerciseEntity} exercise
   */
  assignSelectedExercise(exercise: ExerciseEntity) {
    this.exerciseAssigned.emit(exercise);
  }

  routeToExercise() {
    this.router.navigateByUrl(this.MANAGE_EXERCISES_ROUTE);
  }
}
