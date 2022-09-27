import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AdresseService } from '../services/adresse.service';

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent implements OnInit {

  public contactForm: FormGroup;
  constructor(
    public adressService: AdresseService,
    public formBuilder: FormBuilder,
  ) { 
    this.contactForm = this.formBuilder.group({
      nom: [''],
      prenom: [''],
      email: [''],
      tel: ['']
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.contactForm.value)
   // this.adressService.createAdress(this.contactForm.value);
  }

}
