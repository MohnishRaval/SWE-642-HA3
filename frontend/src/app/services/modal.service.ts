import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalSubject = new BehaviorSubject<{
    display: string;
    header: string;
    body: TemplateRef<any>;
    displayBody?: boolean;
  }>({
    display: 'none',
    header: '',
    body: null as any,
    displayBody: false,
  });
  public modalContent$ = this.modalSubject.asObservable();

  constructor(private dataService: DataService) {}

  openModal(header: string, body: TemplateRef<any>, displayBody = false) {
    return this.modalSubject.next({
      display: 'block',
      header,
      body,
      displayBody,
    });
  }

  closeModal() {
    return this.modalSubject.next({
      display: 'none',
      header: '',
      body: null as any,
    });
  }
}
