import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';

import {TaskEffects} from "./redux/effects/task.effects";
import {ListEffects} from "./redux/effects/list.effects";
import {taskReducer} from "./redux/reducers/task.reducer";
import {listReducer} from "./redux/reducers/list.reducer";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({task: taskReducer, list: listReducer}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: !isDevMode()}),
    EffectsModule.forRoot([TaskEffects, ListEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
