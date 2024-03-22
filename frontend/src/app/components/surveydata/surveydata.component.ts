import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { Toast, ToastrService } from 'ngx-toastr';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { FormPostModel } from 'src/app/models/PostModel';
import { map } from 'rxjs/operators';
import { CustomspinnerService } from 'src/app/services/customspinner.service';
import { HttpClient, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-surveydata',
  templateUrl: './surveydata.component.html',
  styleUrls: ['./surveydata.component.scss'],
})
export class SurveydataComponent implements OnInit, OnDestroy {
  surveyDataSubscriptions: Subscription[] = [];
  private gridApi!: GridApi;
  rowData: any = [];

  @ViewChild('dynamicContent') dynamicContent!: TemplateRef<any>;

  columnDefs: ColDef[] = [
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
    private spinnerService: CustomspinnerService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.displayFormDetails();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

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

  ngOnDestroy(): void {
    this.surveyDataSubscriptions.forEach((subi) => subi.unsubscribe());
  }
}
