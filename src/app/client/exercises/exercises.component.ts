import {Component, Input, OnInit} from '@angular/core';
import {ExerciseEntity} from '../../shared/entities/exercise.entity';
import {ClientService} from '../../shared/services/firestore/client.service';
import {AuthService} from '../../auth/shared/auth.service';

@Component({
  selector: 'rehab-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss']
})
export class ExercisesComponent implements OnInit {

  @Input()
  currentExercise: ExerciseEntity;

  constructor(private clientService: ClientService,
              private authService: AuthService) {
  }

  ngOnInit() {
    // Get currently logged in user
    const userId = this.authService.getUserId();
    // Load client
    this.clientService.getCurrentClientById(userId)
    // Load first exercise from client's  list of exercises
      .map(client => {
        if (client.rehabilitationPlan.exercises) {
          return client.rehabilitationPlan.exercises[0];
        }
      })
      .subscribe(firstExercise => this.currentExercise = firstExercise);
  }

}
