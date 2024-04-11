import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalService } from 'src/app/services/modal.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { FormPostModel } from 'src/app/models/PostModel';
import { map } from 'rxjs/operators';
import { CustomspinnerService } from 'src/app/services/customspinner.service';
import { IEditDeleteModel } from '../../models/Edit-Delete-Model';
@Component({
  selector: 'app-surveydata',
  templateUrl: './surveydata.component.html',
  styleUrls: ['./surveydata.component.scss'],
})
export class SurveydataComponent implements OnInit, OnDestroy {
  surveyDataSubscriptions: Subscription[] = [];
  //Edit/Delete Modal variables
  display: string = 'none';
  handleDelete: boolean = false;
  modalSubscription: Subscription = new Subscription();
  modalHeaderName: string = 'Edit Survey Form';
  modalData!: IEditDeleteModel;
  //AG-Grid Variables
  private gridApi!: GridApi;
  rowData: any = [];

  columnDefs: ColDef[] = [
    {
      headerName: 'Delete',
      cellRenderer: () => `
      <button style="cursor:pointer; border-radius: 10px; background-color: red; border: none;"" 
        onmouseover="this.style.backgroundColor='darkred'" 
        onmouseout="this.style.backgroundColor='red'">
        Delete
      </button>
    `,
      flex: 1,
      suppressSizeToFit: true, // Ensure this column doesn't resize,
    },
    {
      headerName: 'Edit',
      cellRenderer: () => `
      <button style="cursor:pointer; border-radius: 10px; background-color: yellow; border: none;"" 
        onmouseover="this.style.backgroundColor='lightyellow'" 
        onmouseout="this.style.backgroundColor='yellow'">
        Edit
      </button>
    `,
      flex: 1,
      suppressSizeToFit: true, // Ensure this column doesn't resize
    },
    {
      field: 'surveyId',
      headerName: 'Survey ID',
      flex: 1,
      colId: 'firstNameId',
    },
    {
      field: 'firstName',
      headerName: 'First Name',
      flex: 1,
      colId: 'firstNameId',
    },
    {
      field: 'lastName',
      headerName: 'Last Name',
      flex: 1,
      colId: 'lastNameId',
    },
    { field: 'city', headerName: 'City', flex: 1, colId: 'cityId' },
    { field: 'state', headerName: 'State', flex: 1, colId: 'stateId' },
    { field: 'zipCode', headerName: 'Zipcode', flex: 1, colId: 'zipCodeId' },
    {
      field: 'phoneNumber',
      headerName: 'PhoneNumber',
      flex: 1,
      colId: 'phoneNumberId',
    },
    { field: 'email', headerName: 'Email', flex: 1, colId: 'emailId' },
    { field: 'date', headerName: 'Date', colId: 'dateId', flex: 1 },
    {
      field: 'recommendation',
      headerName: 'Recommendation',
      colId: 'recommendationId',
      flex: 1,
    },
  ];
  constructor(
    private modalService: ModalService,
    private dataService: DataService,
    private toastrService: ToastrService,
    private spinnerService: CustomspinnerService
  ) {
    this.modalData = {} as IEditDeleteModel;
  }

  ngOnInit(): void {
    this.displayFormDetails();
    this.modalSubscription = this.modalService.surveyEditModal$.subscribe(
      (response) => {
        this.display = response ? 'block' : 'none';
      }
    );
  }

  //AG-Grid Ready Event
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

  //Displays Form Details in Ag-grid
  displayFormDetails() {
    this.spinnerService.show('Fetching Survey Form Details');
    const displayFormDataSub = this.dataService
      .fetchFormDetails()
      .pipe(
        map((formdata: Partial<FormPostModel>) => {
          return (formdata as any).map((object: any) => {
            const date = object.date.split('T')[0];
            return { ...object, date };
          });
        })
      )
      .subscribe(
        (updatedData: Partial<FormPostModel>[]) => {
          this.spinnerService.hide();
          setTimeout(() => {
            this.toastrService.success('Survey Records Fetched Successfully');
          }, 2000);
          this.rowData = updatedData;
          console.log(this.rowData);
        },
        (error) => {
          this.spinnerService.hide();
          this.toastrService.error('Failed to Fetch Survey Form Details');
        }
      );
    this.surveyDataSubscriptions.push(displayFormDataSub);
  }

  //handles Cell Click to Open Edit/Delete Modal
  onCellClicked(event: any) {
    if (
      event.colDef.headerName === 'Edit' ||
      event.colDef.headerName === 'Delete'
    ) {
      this.handleDelete = event.colDef.headerName === 'Delete' ? true : false;
      this.spinnerService.show('Loading Selected Survey Form Record');
      this.modalHeaderName =
        event.colDef.headerName + ' Selected Survey Form Record';
      this.display = 'block';
      this.modalData = {
        surveyId: event.data.surveyId,
        city: event.data.city,
        email: event.data.email,
        firstName: event.data.firstName,
        lastName: event.data.lastName,
        phoneNumber: event.data.phoneNumber,
        state: event.data.state,
        zipCode: event.data.zipCode,
        data: event.data.date,
        recommendation: event.data.recommendation,
      };
      console.log('Modal Data=' + JSON.stringify(this.modalData));
    }
    this.spinnerService.hide();
    return;
  }

  //Opens Modal
  openModal(rowData: any) {
    this.display = 'block';
  }

  //Closes Modal
  closeModal() {
    this.display = 'none';
  }

  //Deletes Selected Survey Record
  deleteRecord() {
    this.spinnerService.show('Deleting Selected Survey Record');
    this.dataService.deleteSurveyRecord(this.modalData.surveyId).subscribe(
      () => {
        this.toastrService.success('Survey Record Deleted Successfully');
        this.displayFormDetails();
        this.spinnerService.hide();
      },
      (error) => {
        this.toastrService.error('Failed to Delete Survey Record');
        this.spinnerService.hide();
      }
    );
    this.display = 'none';
  }

  //updates Selected Survey Record
  updateRecord() {
    this.spinnerService.show('Updating Selected Survey Record');
    const formModelPartial: Partial<FormPostModel> = {
      firstName: this.modalData.firstName,
      lastName: this.modalData.lastName,
      city: this.modalData.city,
      state: this.modalData.state,
      zipCode: this.modalData.zipCode,
      phoneNumber: this.modalData.phoneNumber,
      email: this.modalData.email,
      date: this.modalData.data,
      recommendation: this.modalData.recommendation,
    };
    const formModel = new FormPostModel(formModelPartial);
    this.dataService
      .updateSurveyRecord(this.modalData.surveyId, formModel)
      .subscribe(
        () => {
          this.toastrService.success('Survey Record Updated Successfully');
          this.displayFormDetails();
          this.spinnerService.hide();
        },
        (error) => {
          this.toastrService.error('Failed to Update Survey Record');
          this.spinnerService.hide();
        }
      );
    this.display = 'none';
  }

  ngOnDestroy(): void {
    this.surveyDataSubscriptions.forEach((subi) => subi.unsubscribe());
    this.modalSubscription.unsubscribe();
  }
}
