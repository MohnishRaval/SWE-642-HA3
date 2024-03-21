import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  NoopAnimationsModule,
} from '@angular/platform-browser/animations';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { SurveydataComponent } from './components/surveydata/surveydata.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RxjsPlaygroundComponent } from './components/rxjs-playground/rxjs-playground.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModalComponent } from './shared/shared-modal/shared-modal.component';
import { AgGridModule } from 'ag-grid-angular';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    SurveydataComponent,
    NavbarComponent,
    RxjsPlaygroundComponent,
    SharedModalComponent,
    WelcomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AgGridModule,
    NgxSpinnerModule,
    NoopAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true,
      positionClass: 'toast-top-right',
      progressAnimation: 'increasing',
    }),
  ],
  providers: [
    DatePipe,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
