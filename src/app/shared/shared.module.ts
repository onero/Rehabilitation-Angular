import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CategoryService } from './services/category.service';
import {ExerciseService} from './services/exercise.service';
import { ClientService } from './services/client.service';
import { RehabilitationPlanService } from './services/rehabilitation-plan.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ToolbarComponent, PageNotFoundComponent],
  exports: [ToolbarComponent],
  providers: [ExerciseService, CategoryService, ClientService, RehabilitationPlanService]
})
export class SharedModule { }
