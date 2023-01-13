import {NgModule, isDevMode} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {EffectsModule} from '@ngrx/effects';

import {TaskEffects} from "./infrastructure/redux/effects/task.effects";
import {ListEffects} from "./infrastructure/redux/effects/list.effects";
import {taskReducer} from "./infrastructure/redux/reducers/task.reducer";
import {listReducer} from "./infrastructure/redux/reducers/list.reducer";

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
