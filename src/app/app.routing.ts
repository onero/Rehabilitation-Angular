import {RouterModule} from '@angular/router';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {LoginComponent} from './auth/login/login.component';
import {ExercisesComponent} from './client/exercises/exercises.component';
import {ManageExercisesComponent} from './therapist/manage-exercises/manage-exercises.component';
import {NewExerciseComponent} from './therapist/manage-exercises/new-exercise/new-exercise.component';
import {ProfileComponent} from './client/profile/profile.component';
import {ManageClientsComponent} from './therapist/manage-clients/manage-clients.component';
import {AuthGuard} from './auth/shared/auth.guard';
import {LoggedInGuard} from './auth/shared/logged-in.guard';

export const AppRoutes = RouterModule.forRoot(
  [
    {
      path: '',
        redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent,
      canActivate: [LoggedInGuard]
    },
    // CLIENT ROUTES
    {
      path: 'client/exercises',
      component: ExercisesComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'client/profile',
      component: ProfileComponent,
      canActivate: [AuthGuard]
    },
    // THERAPIST ROUTES
    {
      path: 'therapist/clients',
      component: ManageClientsComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'therapist/exercises',
      component: ManageExercisesComponent,
      canActivate: [AuthGuard]
    },
    {
      path: 'therapist/exercises/new',
      component: NewExerciseComponent,
      canActivate: [AuthGuard],
      data: [{category: ''}]
    },
    { path: '**', component: PageNotFoundComponent } // This must be last!
  ]
);
