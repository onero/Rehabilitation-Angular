import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisesComponent } from './exercises/exercises.component';
import { ExerciseListComponent } from './exercises/exercise-list/exercise-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ExercisesComponent, ExerciseListComponent]
})
export class ClientModule { }
