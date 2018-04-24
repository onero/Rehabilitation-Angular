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

  createNewExercise(newExerciseForm: NgForm) {
    const newExercise: ExerciseModel = {
      title: newExerciseForm.value.title,
      description: newExerciseForm.value.description,
      repetition: newExerciseForm.value.repetition,
      videoUrl: newExerciseForm.value.videoUrl,
      category: newExerciseForm.value.category,
    };
    this.exerciseService.addExercise(newExercise);
  }
}
