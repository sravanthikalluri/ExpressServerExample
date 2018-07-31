import { BrowserModule } from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppService} from './app.service';
import {HttpModule} from '@angular/http';

import {Ng2Bs3ModalModule} from 'ng2-bs3-modal/ng2-bs3-modal';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
   Ng2Bs3ModalModule
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
