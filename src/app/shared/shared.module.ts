import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ToolbarComponent, PageNotFoundComponent],
  exports: [ToolbarComponent]
})
export class SharedModule { }
