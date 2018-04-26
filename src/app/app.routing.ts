import {RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {LoginComponent} from './auth/login/login.component';
import {ExercisesComponent} from './client/exercises/exercises.component';
import {ManageExercisesComponent} from './therapist/manage-exercises/manage-exercises.component';
import {NewExerciseComponent} from './therapist/manage-exercises/new-exercise/new-exercise.component';
import {ManageClientsComponent} from './therapist/manage-clients/manage-clients.component';

export const AppRoutes = RouterModule.forRoot(
  [
    {
      path: '',
      redirectTo: '',
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent
    },
    // CLIENT ROUTES
    {
      path: 'client/exercises',
      component: ExercisesComponent
    },
    // THERAPIST ROUTES
    {
      path: 'therapist/clients',
      component: ManageClientsComponent
    },
    {
      path: 'therapist/exercises',
      component: ManageExercisesComponent
    },
    {
      path: 'therapist/exercises/new',
      component: NewExerciseComponent,
      data: [{category: ''}]
    },
    { path: '**', component: PageNotFoundComponent } // This must be last!
  ]
);
