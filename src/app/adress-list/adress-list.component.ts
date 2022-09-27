import { Component, OnInit } from '@angular/core';

declare var window: any;
@Component({
  selector: 'app-adress-list',
  templateUrl: './adress-list.component.html',
  styleUrls: ['./adress-list.component.css']
})
export class AdressListComponent implements OnInit {

  formModal: any;
  constructor() { }

  ngOnInit(): void {
    this.formModal = new window.bootstrap.Modal(
      document.getElementById("exampleModal")
    );
  }

  openModal(){
    this.formModal.show();
  }

  doSomething(){
    this.formModal.hide();
  }
}
