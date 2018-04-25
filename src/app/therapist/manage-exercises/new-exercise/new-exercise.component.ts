import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {ExerciseModel} from '../../../client/shared/exercise.model';
import {ExerciseService} from '../../../shared/services/exercise.service';

@Component({
  selector: 'rehab-new-exercise',
  templateUrl: './new-exercise.component.html',
  styleUrls: ['./new-exercise.component.scss']
})
export class NewExerciseComponent implements OnInit {
  category = '';

  constructor(private router: Router,
              private exerciseService: ExerciseService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.category = this.route.snapshot.params.category;
  }

  /**
  * Navigate back to exercises
  */
  cancelForm() {
    this.router.navigateByUrl('therapist/exercises');
  }

  /**
  * Create new exercise with information from the form
  */
  createNewExercise(newExerciseForm: ExerciseModel) {
    // Create exercise object with information from fields
    const newExercise: ExerciseModel = {
      title: newExerciseForm.title,
      description: newExerciseForm.description,
      repetition: newExerciseForm.repetition,
      videoUrl: newExerciseForm.videoUrl,
      category: this.category
    };
    this.exerciseService.addExercise(newExercise)
      .then(() => {
        this.router.navigateByUrl('therapist/exercises');
      })
      .catch(err => console.log(err));
  }
}
