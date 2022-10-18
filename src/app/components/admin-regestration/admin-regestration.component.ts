import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { RegesterAdminRequestBody } from 'src/app/models/RegesterAdminRequestBody';
import { UserRequest } from 'src/app/models/UserRequest';
import { UserRegestrationService } from 'src/app/services/user-regestration.service';

@Component({
  selector: 'app-admin-regestration',
  templateUrl: './admin-regestration.component.html',
  styleUrls: ['./admin-regestration.component.css']
})
export class AdminRegestrationComponent implements OnInit {
  message: any;
  showMessage: boolean = false;

  constructor(
    private formBuilder : FormBuilder,
    private userRegestrationService :UserRegestrationService,
  ) { }
  adminRegForm:FormGroup;
  adminUserName:any;
  adminPassword:any;
  ngOnInit(): void {

    this.adminRegForm = this.formBuilder.group({
      adminUserName : new FormControl(''),
      adminPassword : new FormControl('')
    })

  }

  onClickSave(){

    let user: UserRequest = {} as UserRequest;
    let regesterAdminRequestBody : RegesterAdminRequestBody = {} as RegesterAdminRequestBody;
    user.username = this.adminRegForm.get('adminUserName')?.value;
    user.password = this.adminRegForm.get('adminPassword')?.value;
    regesterAdminRequestBody.adminCreds = user;
    if(user.username != null && user.password != null){

      this.userRegestrationService.saveAdminCreds(regesterAdminRequestBody)
      .subscribe((response)=>{

        if(response){
          if(response.body.message == "Successfully Added The User Admin"){
            this.showMessage = true;
            setTimeout (() => {
              this.showMessage = false;
           }, 1000);
            
             this.message = response.body.message;
             this.adminRegForm.reset();
          }
          else{
            this.showMessage = true;
            setTimeout (() => {
              this.showMessage = false;
           }, 1000);
            this.message = response.body.message;
            this.adminRegForm.reset();
          }
        }
        console.log("Response from adding admin", response);

      },
      (error)=>{
       console.log("Error Occured");
      })

    }
    

  }
  onClickReset(){

  }
}
