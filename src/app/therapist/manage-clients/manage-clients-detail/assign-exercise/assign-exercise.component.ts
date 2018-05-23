import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {ExerciseModel} from '../../../../client/shared/exercise.model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
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
  exercises: ExerciseModel[] = [];

  @Output()
  exerciseUnassigned = new EventEmitter<string>();

  @Output()
  exerciseAssigned = new EventEmitter<string>();

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
   * @param {ExerciseModel} exercise
   */
  assignSelectedExercise(exercise: ExerciseModel) {
    this.exercises.push(exercise);
    this.exerciseAssigned.emit(exercise.uid);
  }

  routeToExercise() {
    this.router.navigateByUrl(this.MANAGE_EXERCISES_ROUTE);
  }
}
