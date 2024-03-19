import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomspinnerService {
  spinnerTimeDuration = 1000;
  private spinnerTextSubject = new BehaviorSubject<string>('Loading ...');
  public spinnerData$ = this.spinnerTextSubject.asObservable();
  constructor(private spinner: NgxSpinnerService) {}

  show(spinnerText?: string, minimumShowTime?: number) {
    if (minimumShowTime) {
      this.spinnerTimeDuration = minimumShowTime;
    }
    const text = spinnerText ?? 'Loading...';

    // Introduce a delay before updating the spinner text
    timer(0)
      .pipe(
        tap(() => {
          this.spinner.show();
        }),
        switchMap(() => timer(0)),
        tap(() => {
          this.spinnerTextSubject.next(text);
        }),
        switchMap(() => timer(this.spinnerTimeDuration))
      )
      .subscribe(() => {
        this.spinner.hide();
      });
  }

  hide() {
    if (this.spinnerTimeDuration) {
      setTimeout(() => {
        this.spinner.hide();
      }, this.spinnerTimeDuration);
    } else {
      this.spinner.hide();
    }
  }
}
