import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PurchaseData } from '../models/PurchaseData';
import { PurchaseDataRequestBody } from '../models/PurchaseDataRequestBody';

@Injectable({
  providedIn: 'root'
})
export class DataUploadService {

  constructor(
    private httpCLient : HttpClient
  ) { }

  addPurchaseData(purchaseDataRequest : PurchaseDataRequestBody) : Observable<any>{

    let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
             .set('Access-Control-Allow-Origin', '*')
            .set('Access-Control-Allow-Methods', 'POST, GET, HEAD, OPTIONS')
    const options = {
              headers: headers,
              observe: 'response' as const
          }
    return this.httpCLient.post(`http://localhost:8082/api/v1/addPurchaseData`, purchaseDataRequest, options)
    .pipe(
      map(result=>{
        return result;
      })
    )


  }
}
