import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ManageExercisesComponent} from './manage-exercises/manage-exercises.component';
import {ManageExercisesListComponent} from './manage-exercises/manage-exercises-list/manage-exercises-list.component';
import {ManageExercisesDetailComponent} from './manage-exercises/manage-exercises-detail/manage-exercises-detail.component';
import {NewExerciseComponent} from './manage-exercises/new-exercise/new-exercise.component';
import {FormsModule} from '@angular/forms';
import {ManageCategoriesListComponent} from './manage-exercises/manage-categories-list/manage-categories-list.component';
import {SharedModule} from '../shared/shared.module';
import {ManageClientsComponent} from './manage-clients/manage-clients.component';
import {ManageClientsDetailComponent} from './manage-clients/manage-clients-detail/manage-clients-detail.component';
import {DiagnosisComponent} from './manage-clients/manage-clients-detail/diagnosis/diagnosis.component';
import {ManageClientsListComponent} from './manage-clients/manage-clients-list/manage-clients-list.component';
import {ManageClientsDiagnosisComponent} from './manage-clients/manage-clients-detail/manage-clients-diagnosis/manage-clients-diagnosis.component';
import {ManageClientsContactInformationComponent} from './manage-clients/manage-clients-detail/manage-clients-contact-information/manage-clients-contact-information.component';
import {ManageClientsGoalComponent} from './manage-clients/manage-clients-detail/manage-clients-goal/manage-clients-goal.component';

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
    ManageClientsListComponent,
    ManageClientsDetailComponent,
    ManageClientsContactInformationComponent,
    ManageClientsDiagnosisComponent,
    ManageClientsGoalComponent]
})
export class TherapistModule {
}
