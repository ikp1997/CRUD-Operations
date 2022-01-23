import { Component, OnInit } from '@angular/core';
import { CardServiceService } from '../card-service.service';
import {MatDialog} from '@angular/material/dialog';
import { AddCardModalComponent } from '../add-card-modal/add-card-modal.component';
import { DataCommunicationService } from '../data-communication.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor(private _cardService:CardServiceService,private dialog:MatDialog,private dataService:DataCommunicationService) { }

  ngOnInit(): void {
    this.getcardDetails();
  }
  dataModel:any;
getcardDetails(){
  this._cardService.getCardDetails().subscribe((res:any)=>{
    this.dataModel=res
    console.log(this.dataModel);
  });
 }
 onAddCard(){
  this.dataService.SeteditCard(false);
   const confirmationDialogRef=this.dialog.open(AddCardModalComponent)
   confirmationDialogRef.afterClosed().subscribe(responce=>{
    this.getcardDetails();
   });
   }
 setImage(data:any){
  var url='data:Image/png;base64,'+data.image;
  return url;
 }
 deleteCard(id:number){
this._cardService.deleteCardDetails(id).subscribe((res:any)=>{
this.getcardDetails();
});
 }
editcard(id:number){
  this.dataService.setCardId(id);
  this.dataService.SeteditCard(true);
  const confirmationDialog=this.dialog.open(AddCardModalComponent)
  confirmationDialog.afterClosed().subscribe(responce=>{
   this.getcardDetails();
  });
}
}
