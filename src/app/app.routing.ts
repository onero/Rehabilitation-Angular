import {RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {LoginComponent} from './auth/login/login.component';
import {ExercisesComponent} from './client/exercises/exercises.component';
import {ManageExercisesComponent} from './therapist/manage-exercises/manage-exercises.component';
import {NewExerciseComponent} from './therapist/manage-exercises/new-exercise/new-exercise.component';

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
      path: 'therapist/exercises',
      component: ManageExercisesComponent
    },
    {
      path: 'therapist/exercises/new',
      component: NewExerciseComponent
    },
    { path: '**', component: PageNotFoundComponent } // This must be last!
  ]
);
