import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalFormComponent } from '../modal-form/modal-form.component';
import { Adresse } from '../models/adresse';
import { AdresseService } from '../services/adresse.service';

declare var window: any;
@Component({
  selector: 'app-adress-list',
  templateUrl: './adress-list.component.html',
  styleUrls: ['./adress-list.component.css']
})
export class AdressListComponent implements OnInit {

  @ViewChild(ModalFormComponent) addview !:ModalFormComponent
  formModal: any;
  contactAdresses!: Adresse[];
  
  constructor(
    public adressService: AdresseService,
  ) { }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );

    this.getAllAdresse();
  }

  // Open Modal
  openModal(){
    this.addview.Clearform();
    this.formModal.show();
  }

  //Get all contacts
  getAllAdresse(){
   this.adressService.getAdresses().subscribe(res => {
     this.contactAdresses = res.map(e => {
       return {
         id: e.payload.doc.id,
         ...e.payload.doc.data() as {}
       } as Adresse
     })
     console.log(this.contactAdresses)
   });
   
  }

  //Remove contact
  removeContact(Adresse: Adresse){
    if(confirm("Vous etes sur de vouloir supprimer " + Adresse.nom)){
      this.adressService.deleteAdress(Adresse);
    }
  }

  edit(id: any){
   this.addview.LoadEditData(id);
  }



  
}
