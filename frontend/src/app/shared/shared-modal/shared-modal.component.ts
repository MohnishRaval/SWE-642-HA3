import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { FormPostModel } from 'src/app/models/PostModel';
import { CustomspinnerService } from 'src/app/services/customspinner.service';
import { DataService } from 'src/app/services/data.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.component.html',
  styleUrls: ['./shared-modal.component.scss'],
})
export class SharedModalComponent implements OnInit, OnDestroy {
  display = 'none';
  header = '';
  body: TemplateRef<any> | null = null;
  displayBody: boolean = false;
  isError: boolean = false;
  errorMessage: SafeHtml = '';
  modalSubscriptions: Subscription[] = [];
  private formPayload!: FormPostModel;

  constructor(
    private modalService: ModalService,
    private dataService: DataService,
    private spinnerService: CustomspinnerService
  ) {}

  ngOnInit(): void {
    const modalContenSub = this.modalService.modalContent$.subscribe(
      (content: {
        display: string;
        header: string;
        displayBody?: boolean;
        body: TemplateRef<any>;
        isError: boolean;
        errorMessage: SafeHtml;
      }) => {
        this.display = content.display;
        this.header = content.header;
        this.body = content.body;
        this.displayBody = content?.displayBody ?? false;
        this.isError = content.isError;
        this.errorMessage = content.errorMessage;
      }
    );
    this.modalSubscriptions.push(modalContenSub);
    if (!this.isError) {
      const getFormPayload = this.dataService.formPayload$.subscribe(
        (getFormData: FormPostModel) => {
          this.formPayload = getFormData;
        }
      );
      console.log(this.formPayload);
      this.modalSubscriptions.push(getFormPayload);
    }
  }

  closeModal() {
    this.modalService.closeModal();
  }

  submitModal() {
    this.spinnerService.show('Form Submitting...');
    const submitFormSub = this.dataService
      .saveFormDetails(this.formPayload)
      .subscribe((response) => {
        this.spinnerService.hide();
      });
    this.modalSubscriptions.push(submitFormSub);
  }

  ngOnDestroy(): void {
    this.modalSubscriptions.forEach((itemSub) => itemSub.unsubscribe());
  }
}
