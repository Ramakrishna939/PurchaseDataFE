import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { PurchaseData } from '../models/PurchaseData';

@Injectable({
  providedIn: 'root'
})
export class PurchasePredictionService {

  constructor(private httpCLient : HttpClient) { }

  doPredictData() : Observable<any>{

    let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
             .set('Access-Control-Allow-Origin', '*')
            .set('Access-Control-Allow-Methods', 'POST, GET, HEAD, OPTIONS')
    const options = {
              headers: headers,
              observe: 'response' as const
          }
    return this.httpCLient.get(`http://localhost:8082/api/v1/doPredict`, options)
    .pipe(
      map(result=>{
        return result;
      })
    )


  }


  getPredictedData() : Observable<any>{

    let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
             .set('Access-Control-Allow-Origin', '*')
            .set('Access-Control-Allow-Methods', 'POST, GET, HEAD, OPTIONS')
    const options = {
              headers: headers,
              observe: 'response' as const
          }
    return this.httpCLient.get(`http://localhost:8082/api/v1/getPredictedPurchaseData`, options)
    .pipe(
      map(result=>{
        return result;
      })
    )


  }


}
