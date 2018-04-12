import {RouterModule, Routes} from '@angular/router';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { LoginComponent } from './auth/login/login.component';

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
    { path: '**', component: PageNotFoundComponent } // This must be last!
  ]
);