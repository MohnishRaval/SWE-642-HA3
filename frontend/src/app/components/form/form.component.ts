import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CustomspinnerService } from 'src/app/services/customspinner.service';
import { ModalService } from 'src/app/services/modal.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FormPostModel } from '../../models/PostModel';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  @ViewChild('formModal') formModal!: TemplateRef<any>;
  surveyForm: FormGroup;
  formSubscriptions: Subscription[] = [];
  mainValid: boolean = false;
  campusLiking = [
    { name: 'students', value: 'students' },
    { name: 'location', value: 'location' },
    { name: 'campus', value: 'campus' },
    { name: 'atmosphere', value: 'atmosphere' },
    { name: 'dormRooms', value: 'dormRooms' },
    { name: 'sports', value: 'sports' },
  ];

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private spinnerService: CustomspinnerService,
    private toastrService: ToastrService,
    private dataService: DataService,
    private sanitizer: DomSanitizer
  ) {
    const currentDate = new Date();
    this.surveyForm = this.fb.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]+'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]+'),
      ]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]+'),
      ]),
      state: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]+'),
      ]),
      zipCode: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{5}'),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      date: new FormControl(currentDate.toISOString().split('T')[0], [
        Validators.required,
      ]),
      campusLikingArray: new FormArray([]),
      likelihood: new FormControl(''),
      comments: new FormControl(''),
    });

    this.addCheckboxes();
  }

  ngOnInit(): void {
    this.spinnerService.show('Loading Form... Please Wait', 2000);
    const surveyFormChanges = this.surveyForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((valueChanges) => {
        // console.log(valueChanges);
      });
    this.formSubscriptions.push(surveyFormChanges);
    this.spinnerService.hide();
  }

  get campusLikingFormArray() {
    return this.surveyForm.controls.campusLikingArray as FormArray;
  }
  private addCheckboxes() {
    this.campusLiking.forEach(() =>
      this.campusLikingFormArray.push(new FormControl(false))
    );
  }

  formHandler = (
    formControlName: string
  ): {
    success: boolean;
    error: boolean;
    displayError: boolean;
  } => {
    const currentControl = this.surveyForm.get(formControlName)!;
    const success =
      currentControl?.valid &&
      (currentControl?.dirty || currentControl?.untouched);

    const error =
      currentControl?.invalid &&
      (currentControl?.dirty || currentControl?.untouched);

    const displayError = false;
    return { success, error, displayError };
  };

  // Generate error message for invalid form fields
  generateErrorMessage = (): string => {
    let errorMessage = `Please correct the following errors:<br>`;
    // Loop through each form control to check for errors
    Object.keys(this.surveyForm.controls).forEach((controlName) => {
      const control = this.surveyForm.get(controlName)!;
      // Check if the control has errors
      if (control.invalid) {
        // Loop through each validation error and append it to the error message
        Object.keys(control.errors!).forEach((error) => {
          errorMessage += `- ${this.getErrorMessage(controlName, error)}<br>`;
        });
      }
    });
    return errorMessage;
  };

  // Get error message based on validation error
  getErrorMessage = (controlName: string, error: string): string => {
    switch (error) {
      case 'required':
        return `The <b>${controlName}</b> field is required.`;
      case 'pattern':
        return `Invalid <b>${controlName}</b>. Please enter a valid value.`;
      // Add cases for other validation errors as needed
      default:
        return `Invalid <b>${controlName}.</b>`;
    }
  };

  // Reset form fields
  resetForm = () => {
    this.spinnerService.show('Resetting From Data', 2000);
    const checkedBox = this.surveyForm.get('campusLikingArray') as FormArray;
    checkedBox.controls.forEach((control) => {
      control.setValue(false);
      control.markAsUntouched();
    });
    this.spinnerService.hide();
    this.surveyForm.reset();
    setTimeout(() => {
      this.toastrService.success('Form Reset Successfully');
    }, 2000);
  };

  // Submit form data
  submitForm = (): void => {
    const selectedCheckBoxes = this.surveyForm.value.campusLikingArray
      .map((checked: any, index: any) =>
        checked ? this.campusLiking[index].value : null
      )
      .filter((value: any) => value != null);

    const formModelPartial: Partial<FormPostModel> = {
      firstName: this.surveyForm.value.firstName,
      lastName: this.surveyForm.value.lastName,
      streetAddress: this.surveyForm.value.address,
      city: this.surveyForm.value.city,
      state: this.surveyForm.value.state,
      zipCode: this.surveyForm.value.zipCode,
      phoneNumber: this.surveyForm.value.phone,
      email: this.surveyForm.value.email,
      date: this.surveyForm.value.date,
      campusLikingArray: selectedCheckBoxes,
      recommendation: this.surveyForm.value.likelihood,
      raffleNumbers: this.surveyForm.value.raffleNumbers,
      won: false,
      optionStudent: true,
    };
    const formModel = new FormPostModel(formModelPartial);
    if (this.surveyForm.valid) {
      this.modalService.openModal(
        'Do you want to submit Survey Form?',
        this.formModal,
        false,
        false,
        ''
      );
      this.dataService.setFormPayload(formModel);
      this.dataService.formAPISucess$.subscribe((response) => {
        if (response) {
          this.resetForm();
          this.toastrService.success('Form Submitted Successfully');
        } else {
          this.toastrService.clear();
          this.toastrService.error('Form Submission Unsuccessful');
        }
      });
    } else {
      const errorMessage = this.sanitizeErrorMessage(
        this.generateErrorMessage()
      );
      console.log(errorMessage);
      this.modalService.openModal(
        'Form Cannot be Submiited',
        this.formModal,
        true,
        true,
        errorMessage
      );
    }
  };

  //Sanitizing HTML message using DOM Sanitizer
  sanitizeErrorMessage = (message: string): SafeHtml => {
    return this.sanitizer.bypassSecurityTrustHtml(message);
  };

  ngOnDestroy(): void {
    this.formSubscriptions.forEach((itemSub) => itemSub.unsubscribe());
  }
}
