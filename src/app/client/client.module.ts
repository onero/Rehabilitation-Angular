import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExercisesComponent } from './exercises/exercises.component';
import { ExerciseInformationComponent } from './exercise-information/exercise-information.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ExercisesComponent, ExerciseInformationComponent]
})
export class ClientModule { }
