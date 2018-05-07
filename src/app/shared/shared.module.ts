import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CategoryService} from './services/category.service';
import {ExerciseService} from './services/exercise.service';
import {ClientService} from './services/client.service';
import {RehabilitationPlanService} from './services/rehabilitation-plan.service';
import {RouterModule} from '@angular/router';
import {RehabErrorService} from './services/rehab-error.service';
import { MessageService } from './services/message.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [ToolbarComponent, PageNotFoundComponent],
  exports: [ToolbarComponent],
  providers: [ExerciseService,
    CategoryService,
    ClientService,
    RehabilitationPlanService,
    RehabErrorService,
    MessageService]
})
export class SharedModule {
}
