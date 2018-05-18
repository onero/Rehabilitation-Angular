import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ToolbarComponent} from './toolbar/toolbar.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {CategoryService} from './services/category.service';
import {ExerciseService} from './services/exercise.service';
import {ClientService} from './services/client.service';
import {RouterModule} from '@angular/router';
import {RehabErrorService} from './services/rehab-error.service';
import { MessageService } from './services/message.service';
import { RehabModalService } from './services/rehab-modal.service';
import { MilestoneService } from './services/milestone.service';

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
    RehabErrorService,
    MessageService,
    RehabModalService,
    MilestoneService]
})

export class SharedModule {
}
