import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomspinnerService } from './services/customspinner.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public spinnerText$!: Observable<string>;
  constructor(
    public router: Router,
    private customSpinner: CustomspinnerService
  ) {
    this.router.navigateByUrl('/surveyform');
  }

  ngOnInit(): void {
    this.spinnerText$ = this.customSpinner.spinnerData$;
  }
}
