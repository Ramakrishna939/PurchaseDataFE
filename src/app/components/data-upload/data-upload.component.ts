import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import { AddUserDetailsRequestBody } from 'src/app/models/AddUserDetailsRequestBody';
import { PurchaseData } from 'src/app/models/PurchaseData';
import { PurchaseDataRequestBody } from 'src/app/models/PurchaseDataRequestBody';
import { UserDetailsRequest } from 'src/app/models/UserDetaislRequest';
import { DataUploadService } from 'src/app/services/data-upload.service';
import { UserRegestrationService } from 'src/app/services/user-regestration.service';

@Component({
  selector: 'app-data-upload',
  templateUrl: './data-upload.component.html',
  styleUrls: ['./data-upload.component.css']
})
export class DataUploadComponent implements OnInit {

  csvRecords: any[] | NgxCSVParserError = [];
  header: boolean = true;
  errorMessage: String = "There has been a Issue With Uploading File";
  successMessage: "Upload Successful";
  isFileNotUploaded: boolean;
  isFileUploaded: boolean;
  userUploadForm: FormGroup;
  headerparse: any;
  frequency: Frequency[];
  toDate:any;
  fromDate:any;
  showDateRange: boolean;
  purchaseDataList : PurchaseData[] = [];
  userDataList : UserDetailsRequest[] = [];
  showTableData: boolean = false;
  totalRecords: number;
  messaage: any;
  showMessage: boolean = false;
  constructor(private ngxCsvParser: NgxCsvParser,
    private formBuilder: FormBuilder, private route: ActivatedRoute,
    private userRegestrationService : UserRegestrationService,
    private dataUploadService : DataUploadService) {

      this.route.queryParams.subscribe((response) => {
        console.log("Params", response);
        let res = JSON.parse(JSON.stringify(response));
         
        if (res.params == "userDataUpload") {
          this.isUserUpload = true;
          this.isPurchaseUpload = false;
        }
        else if (res.params == "purchaseDataUpload") {
          this.isPurchaseUpload = true;
          this.isUserUpload = false;
        }
      });


    
  }

  @ViewChild('fileImportInput') fileImportInput: any;

  fileChangeListener($event: any): void {
    const files = $event.srcElement.files;
    this.header =
      (this.header as unknown as string) === 'true' ||
      this.header === true;

    this.ngxCsvParser
      .parse(files[0], {
        header: this.header,
        delimiter: ',',
        encoding: 'utf8'
      })
      .pipe()
      .subscribe(
        (result) => {
          
          this.csvRecords = result;
          
          if (this.csvRecords) {
            this.isFileUploaded = true;
            this.isFileNotUploaded = false;
          }
          else {
            this.isFileUploaded = false;
            this.isFileNotUploaded = true;
          }

          if(this.isUserUpload){
            this.userDataList = <UserDetailsRequest[]>this.csvRecords;
            console.log("UserDataList", this.userDataList);
          }
          if(this.isPurchaseUpload){
           this.purchaseDataList = <PurchaseData[]>this.csvRecords;
           this.totalRecords = this.purchaseDataList.length;
            console.log("Purchase Data List", this.purchaseDataList);
          }
        }

      );
  }
  isUserUpload: boolean = false;
  uploadedfiles: any;
  isPurchaseUpload: boolean = false;
  selectedFreq:any;
  onClickUpload() {

    if(this.isPurchaseUpload){
      this.showTableData = true;
      let purchaseDetailsRequest : PurchaseDataRequestBody = {} as PurchaseDataRequestBody;
      let purchaseDataList : PurchaseData[] = this.purchaseDataList;
      purchaseDetailsRequest.purchaseDataList = purchaseDataList;

      this.dataUploadService.addPurchaseData(purchaseDetailsRequest).subscribe((response)=>{
         console.log("Purchase Data Uploaded", response);
         //Successfully Added The Purchase Data
         if(response.body.message == "Successfully Added The Purchase Data"){
          this.showMessage = true;
          this.messaage = response.body.message;
          this.userUploadForm.reset();
          setTimeout (() => {
            this.showMessage = false;
         }, 3000);
        }
        else{
          this.showMessage = true;
          this.messaage = response.body.message;
          this.userUploadForm.reset();
          setTimeout (() => {
            this.showMessage = false;
         }, 3000);
        }
      })

    }
    else if(this.isUserUpload){
      let userDetailsRequest : AddUserDetailsRequestBody = {} as AddUserDetailsRequestBody;
      let user : UserDetailsRequest = {} as UserDetailsRequest;
      user.emailId = this.userDataList[0].emailId;
      user.userAge = this.userDataList[0].userAge;
      user.userCountry = this.userDataList[0].userCountry;
      user.userName = this.userDataList[0].userName;
      user.userState = this.userDataList[0].userState;
      userDetailsRequest.user = user;
      this.userRegestrationService.saveUserDetails(userDetailsRequest).subscribe((response)=>{
        console.log("User Details Save Response", response);
        if(response.body.message == "Successfully Added The User"){
          this.showMessage = true;
          this.messaage = response.body.message;
          this.userUploadForm.reset();
          setTimeout (() => {
            this.showMessage = false;
         }, 2000);
        }
        else{
          this.showMessage = true;
          this.messaage = response.body.message;
          this.userUploadForm.reset();
          setTimeout (() => {
            this.showMessage = false;
         }, 2000);
        }
      })


    }

  }
  onClickReset() {
    this.userUploadForm.reset();
  }
  ngOnInit(): void {

    this.userUploadForm = this.formBuilder.group({
      headerparse: new FormControl(''),
      uploadedfiles: new FormControl(''),
      fromDate:new FormControl(''),
      toDate : new FormControl(''),
      selectedFreq : new FormControl('')
    });

    this.frequency = [
      { name: 'Monthly', code: 'Monthly' },
      { name: 'Yearly', code: 'Yearly' },
      { name: 'Custom Date Range', code: 'customDateRange' }

    ];
    
    this.userUploadForm.get('selectedFreq')?.valueChanges.subscribe((value)=>{
      console.log("Frequecny value changed");
      if(value == "customDateRange"){
        this.showDateRange = true;
      }
      else{
        this.showDateRange = false;
      }
    })

  



  }

}

export interface Frequency {
  code: String;
  name: String;
}