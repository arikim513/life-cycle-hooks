import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PeekABooComponent } from "./peek-a-boo.component";
import { PeekABooParentComponent } from "./peek-a-boo-parent.component";
import { SpyDirective } from './spy.directive';
import { SpyParentComponent } from './spy.component';
import {
  OnChangesParentComponent,
  OnChangesComponent
} from './on-changes.component';
import {
  AfterViewParentComponent,
  AfterViewComponent,
  ChildViewComponent
} from './after-view.component';
import {
  AfterContentParentComponent,
  AfterContentComponent,
  ChildComponent
} from './after-content.component';


@NgModule({
  declarations: [
    AppComponent,
    PeekABooComponent,
    PeekABooParentComponent,
    SpyDirective,
    SpyParentComponent,
    OnChangesParentComponent,
    OnChangesComponent,
    AfterViewParentComponent,
    AfterViewComponent,
    ChildViewComponent,
    AfterContentParentComponent,
    AfterContentComponent,
    ChildComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
