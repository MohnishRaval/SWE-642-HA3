import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveydataComponent } from './components/surveydata/surveydata.component';
import { FormComponent } from './components/form/form.component';
import { RxjsPlaygroundComponent } from './components/rxjs-playground/rxjs-playground.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'surveydata', component: SurveydataComponent },
  { path: 'surveyform', component: FormComponent },
  { path: 'rxjs', component: RxjsPlaygroundComponent },
  { path: 'welcome', component: WelcomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
