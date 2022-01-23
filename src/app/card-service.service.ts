import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http'
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CardServiceService {

  constructor(private http:HttpClient) { }
  UrlForGetcards:string="http://localhost:5208/CrudOperation/getCardDetails";
  urlDeleteCards:string="http://localhost:5208/CrudOperation/deleteCardDetails";
  urlEditCard:string="http://localhost:5208/CrudOperation/editCardDetails";

  getCardDetails():Observable<any>{
   return this.http.get<any>(this.UrlForGetcards)
  }

  deleteCardDetails(id:number):Observable<any>{
    let params=new HttpParams();
    params=params.append("id",id);
    return this.http.delete<any>(this.urlDeleteCards,{params})
  }
  editCardDetails(id:number,cardName:string,price:number):Observable<any>{
    let params=new HttpParams();
    params=params.append("id",id);
    params=params.append("cardname",cardName);
    params=params.append("price",price);
    return this.http.patch<any>(this.urlEditCard,null,{params});
  }
}

