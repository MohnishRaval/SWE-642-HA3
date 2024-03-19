import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { NotificationService } from 'src/app/services/notification.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentRoute = '';
  notificationCount: number = 0;
  receivedNotifications$: Observable<any> | undefined;
  constructor(
    private dataService: DataService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.currentRoute = this.dataService.currentActivatedRoute;
    this.receivedNotifications$ =
      this.notificationService.showNotificationData$;
    this.receivedNotifications$.subscribe((notifcations) => {
      this.notificationCount = notifcations.length;
    });
  }
}
