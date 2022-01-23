import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CardServiceService } from '../card-service.service';
import { DataCommunicationService } from '../data-communication.service';


@Component({
  selector: 'app-add-card-modal',
  templateUrl: './add-card-modal.component.html',
  styleUrls: ['./add-card-modal.component.css']
})
export class AddCardModalComponent  {

  data:any;
  cardName:string="";
  cardPrice:number=0;
  myForm: FormGroup;

  constructor(private http: HttpClient,private dialog:MatDialog,private dataService:DataCommunicationService,private cardService:CardServiceService)
  {

    this.myForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      file: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      fileSource: new FormControl('', [Validators.required])
    });
  }
      
  get f(){
    return this.myForm.controls;
  }
     
  onFileChange(event:any) {
  
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.data=event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }
     
  submit(){
    if(!this.dataService.editCard)
    {
    const formData = new FormData();   
    formData.append('file',this.data);
    let params=new HttpParams();
    console.log(this.myForm.value.name);
     params=params.append("cardName",this.myForm.value.name);
     params=params.append("cardPrice",this.myForm.value.price);
    this.http.post('http://localhost:5208/CrudOperation/addCardDetails', formData,{params})
      .subscribe(res => {
        console.log(res);
        alert('Uploaded Successfully.');
        this.dialog.closeAll();
      });
    }
    else
    {
      this.cardService.editCardDetails(this.dataService.cardId,this.myForm.value.name,this.myForm.value.price).subscribe(result=>{
      })
    }
  }
  close(){
    this.dialog.closeAll();
  }
}
