import { Component, OnInit } from '@angular/core';
import { CustomspinnerService } from 'src/app/services/customspinner.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss'],
})
export class WelcomeComponent implements OnInit {
  constructor(private spinnerService: CustomspinnerService) {}

  ngOnInit(): void {
    this.spinnerService.show('Loading Application... Please Wait', 2000);
  }
}
