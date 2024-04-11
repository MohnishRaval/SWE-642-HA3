import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DataService } from './data.service';
import { SafeHtml } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalSubject = new BehaviorSubject<{
    display: string;
    header: string;
    body: TemplateRef<any>;
    displayBody?: boolean;
    isError: boolean;
    errorMessage: SafeHtml;
  }>({
    display: 'none',
    header: '',
    body: null as any,
    displayBody: false,
    isError: false,
    errorMessage: '',
  });
  public modalContent$ = this.modalSubject.asObservable();
  private surveyEditModalSubject = new BehaviorSubject<any>(null);
  public surveyEditModal$ = this.surveyEditModalSubject.asObservable();
  constructor(private dataService: DataService) {}

  openModal(
    header: string,
    body: TemplateRef<any>,
    displayBody: boolean = false,
    isError: boolean = false,
    errorMessage: SafeHtml = ''
  ) {
    return this.modalSubject.next({
      display: 'block',
      header,
      body,
      displayBody,
      isError,
      errorMessage,
    });
  }

  closeModal() {
    return this.modalSubject.next({
      display: 'none',
      header: '',
      body: null as any,
      displayBody: false,
      isError: false,
      errorMessage: '',
    });
  }

  openSurveyEditModal(rowData: any) {
    this.surveyEditModalSubject.next(rowData);
  }

  // closeSurveyEditModal() {
  //   this.surveyEditModalSubject.next(false);
  // }
}
