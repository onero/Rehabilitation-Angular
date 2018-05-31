import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ExerciseEntity} from '../../shared/entities/exercise.entity';
import {ClientService} from '../../shared/services/firestore/client.service';
import {AuthService} from '../../auth/shared/auth.service';

@Component({
  selector: 'rehab-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit, OnDestroy {

  @Input()
  currentExercise: ExerciseEntity;

  $subscribe;

  constructor(private clientService: ClientService,
              private authService: AuthService) {
  }

  ngOnInit() {
    // Get currently logged in user
    const userId = this.authService.getUserId();
    // Load client
    this.$subscribe = this.clientService.getCurrentClientById(userId)
    // Load first exercise from client's  list of exercises
      .map(client => {
        if (client.rehabilitationPlan.exercises) {
          return client.rehabilitationPlan.exercises[0];
        }
      })
      .subscribe(firstExercise => this.currentExercise = firstExercise);
  }

  ngOnDestroy(): void {
    this.$subscribe.unsubscribe();
  }

}
