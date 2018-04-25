import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageExercisesComponent} from './manage-exercises/manage-exercises.component';
import {ManageExercisesListComponent} from './manage-exercises/manage-exercises-list/manage-exercises-list.component';
import {ManageExercisesDetailComponent} from './manage-exercises/manage-exercises-detail/manage-exercises-detail.component';
import {NewExerciseComponent} from './manage-exercises/new-exercise/new-exercise.component';
import {FormsModule} from '@angular/forms';
import {ManageCategoriesListComponent} from './manage-exercises/manage-categories-list/manage-categories-list.component';
import {SharedModule} from '../shared/shared.module';
import { ManageClientsComponent } from './manage-clients/manage-clients.component';
import { DiagnosisComponent } from './manage-clients/manage-clients-detail/diagnosis/diagnosis.component';
import {ManageClientsDetailComponent} from './manage-clients/manage-clients-detail/manage-clients-detail.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule
  ],
  declarations: [ManageExercisesComponent,
    ManageExercisesListComponent,
    ManageExercisesDetailComponent,
    NewExerciseComponent,
    ManageCategoriesListComponent,
    ManageClientsComponent,
    ManageClientsDetailComponent,
    DiagnosisComponent]
})
export class TherapistModule {
}
