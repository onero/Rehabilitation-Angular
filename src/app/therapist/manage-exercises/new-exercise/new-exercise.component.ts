import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ExerciseModel} from '../../../client/shared/exercise.model';
import {ExerciseService} from '../../../shared/services/exercise.service';

@Component({
  selector: 'rehab-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss']
})
export class NewExerciseComponent implements OnInit {

  constructor(private router: Router,
              private exerciseService: ExerciseService) { }

  ngOnInit() {
  }

  cancelForm() {
    this.router.navigateByUrl('therapist/exercises');
  }

  createNewExercise(newExerciseForm: ExerciseModel) {
    const newExercise: ExerciseModel = {
      title: newExerciseForm.title,
      description: newExerciseForm.description,
      repetition: newExerciseForm.repetition,
      videoUrl: newExerciseForm.videoUrl,
      category: 'Hand' // TODO ALH: Replace!
    };
    this.exerciseService.addExercise(newExercise)
      .then(() => {
        this.router.navigateByUrl('therapist/exercises');
      })
      .catch(err => console.log(err));
  }
}
