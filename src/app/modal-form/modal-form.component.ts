import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AdresseService } from '../services/adresse.service';


declare var window: any;
@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {

  submitted = false;
  formModal: any;
  contactForm: any;
  errorMessage!: string;
  contact: any;

  constructor(
    public adressService: AdresseService,
    public formBuilder: FormBuilder,
  ) { 
    
  }

  

  // get f() { return this.contactForm.controls; }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
    this.contactForm = new FormGroup({
      nom: new FormControl('', Validators.compose([Validators.required])),
      prenom: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl('', Validators.compose([Validators.required, Validators.email])),

      tel: new FormArray([
        new FormControl(null, Validators.compose([Validators.required])),
       
      ])
    })

  
  }

  // get nom(){
  //   return this.contactForm.get('nom');
  // }

  // get prenom(){
  //   return this.contactForm.get('prenom');
  // }

  // get email(){
  //   return this.contactForm.get('email');
  // }

  // get tel(){
  //   return this.contactForm.get('tel');
  // }




  close(){
    console.log('ok', this.formModal)
    this.formModal.hide();
   
  }

  LoadEditData(id: any){
    localStorage.setItem('ID', id);
    this.formModal.show();
    this.adressService.getAdressById(id).subscribe(res => {
      console.log(res);
      this.contact = res;
      this.contactForm.setValue({
        nom: this.contact.nom,
        prenom: this.contact.prenom,
        email: this.contact.email,
        tel : this.contact.tel 
      })
    })
  }

  addTel(){
    const control=new FormControl(null,Validators.required);
    (<FormArray>this.contactForm.get('tel')).push(control);
  }

  Clearform(){
    this.ngOnInit();
  }

  onSubmit(){
    
    console.log(this.contactForm.value)
    if( localStorage.getItem("ID") != null){
      console.log(this.contact)
      console.log(localStorage.getItem("ID"));
      this.adressService.updateAdress(this.contactForm.value, localStorage.getItem("ID"))
      localStorage.removeItem("ID");
      return
    }
    if(this.contactForm.valid){
      this.adressService.createAdress(this.contactForm.value);
    }else{
      this.errorMessage = "Remplissez le formulaire"
    }
   
  }

}
