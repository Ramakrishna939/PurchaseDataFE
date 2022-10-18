import { Component, OnInit } from '@angular/core';
import { UserDetailsRequest } from 'src/app/models/UserDetaislRequest';
import { PurchasePredictionService } from 'src/app/services/purchase-prediction.service';

@Component({
  selector: 'app-purchase-analysis',
  templateUrl: './purchase-analysis.component.html',
  styleUrls: ['./purchase-analysis.component.css']
})
export class PurchaseAnalysisComponent implements OnInit {
  showMessage: boolean = false;
  message: string;
  showTable: boolean = false;

  constructor( private purchasePredictionService : PurchasePredictionService ) { 



   }

  purchasePredictedDataList : UserDetailsRequest[] = [];
  totalRecords:any;
  showPurchaseAnalysis:boolean=false;
  ClickPredict(  ){
    
this.purchasePredictionService.doPredictData().subscribe((response)=>{
          console.log("Response", response);
          if(response.body.message == "SUCCESS"){
            this.showMessage = true;
            this.message = "Successfully Analysed the Data";
            setTimeout (() => {
              this.showMessage = false;
           }, 3000);
          }
})

  }
  ngOnInit(): void {
  }
  ClickGetPredictData(){

    this.purchasePredictionService.getPredictedData().subscribe((response)=>{
      console.log("Response", response);
      
      this.purchasePredictedDataList = response.body.usersList;
      if(this.purchasePredictedDataList.length>0){
        this.showPurchaseAnalysis = true;
      }

      
})
    
  }
}
