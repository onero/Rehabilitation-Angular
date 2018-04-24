import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageExercisesComponent } from './manage-exercises/manage-exercises.component';
import { ManageExercisesListComponent } from './manage-exercises/manage-exercises-list/manage-exercises-list.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ManageExercisesComponent, ManageExercisesListComponent]
})
export class TherapistModule { }
