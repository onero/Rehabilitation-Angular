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
    const userId = this.authService.getUserId();
    this.clientService.getCurrentClientById(userId)
      .map(client => client.rehabilitationPlan.exercises[0])
      .subscribe(firstExercise => this.currentExercise = firstExercise);
  }

}
