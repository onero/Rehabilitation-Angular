import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExerciseEntity} from '../../../shared/entities/exercise.entity';
import {ExerciseService} from '../../../shared/services/exercise.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'rehab-manage-exercises-detail',
  templateUrl: './manage-exercises-detail.component.html',
  styleUrls: ['./manage-exercises-detail.component.scss']
})
export class ManageExercisesDetailComponent implements OnInit {
  @Input()
  currentExercise: ExerciseEntity;
  @Output()
  deletedExercise = new EventEmitter();

  editMode = false;

  constructor(private exerciseService: ExerciseService) { }

  ngOnInit() {
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  /**
   * Deletes the selected exercise.
   */
  deleteExercise() {
    this.exerciseService.deleteExercise(this.currentExercise)
      .then(() => {
        this.deletedExercise.emit();
      });
  }

  /**
   * Updates the exercise.
   * @param {ExerciseEntity} updateExerciseForm
   */
  updateExercise(updateExerciseForm: ExerciseEntity) {
    const updatedExercise: ExerciseEntity = {
      uid: this.currentExercise.uid,
      title: updateExerciseForm.title ? updateExerciseForm.title : this.currentExercise.title,
      description: updateExerciseForm.description ? updateExerciseForm.description : this.currentExercise.description,
      repetition: updateExerciseForm.repetition ? updateExerciseForm.repetition : this.currentExercise.repetition,
      videoUrl: updateExerciseForm.videoUrl ? updateExerciseForm.videoUrl : this.currentExercise.videoUrl,
      category: this.currentExercise.category
    };
    this.exerciseService.updateExercise(updatedExercise)
      .then(() => {
        this.toggleEdit();
      });
  }
}
