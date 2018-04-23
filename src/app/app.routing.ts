import {RouterModule, Routes} from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';
import { ExercisesComponent } from './client/exercises/exercises.component';

export const AppRoutes = RouterModule.forRoot(
  [
    {
      path: '',
      redirectTo: '',
      pathMatch: 'full'
    },
    {
      path: 'client/exercises',
      component: ExercisesComponent
    },
    {
      path: 'login',
      component: LoginComponent
    },
    { path: '**', component: PageNotFoundComponent } // This must be last!
  ]
);
