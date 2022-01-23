import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataCommunicationService {

  constructor() { }
  editCard:boolean=false;
  cardId:number=0;

  public setCardId(data:any){
    this.cardId=data;
  }
  public SeteditCard(data:any){
    this.editCard=data;
  }
}
