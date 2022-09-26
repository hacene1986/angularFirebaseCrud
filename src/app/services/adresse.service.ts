import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Adresse } from '../models/adresse';

@Injectable({
  providedIn: 'root'
})
export class AdresseService {

  constructor(
    private angularFirestore: AngularFirestore
  ) { }


  // Get adress by ID
  getAdressById(id: any){
    return this.angularFirestore.collection("adresse-collection").doc(id).valueChanges();
  }

  // Get all adresses
  getAdresses(){
    return this.angularFirestore.collection("adresse-collection").snapshotChanges();
  }

  // Create adress
  createAdress(adress: Adresse){
    return new Promise<any>((resolve, reject) => {
      this.angularFirestore.collection("adresse-collection").add(adress).then((res)=>{
        console.log("RES==", res);
      }, error => {
        console.log("Err==", error);
      })
    })
  }


  // Delete adress
  deleteAdress(adress: Adresse){
    return this.angularFirestore.collection("adresse-collection").doc(adress.id).delete();
  }


  // Update adress
  updateAdress(adress: Adresse, id: any){
    return this.angularFirestore.collection("adresse-collection").doc(id).update({
      nom: adress.nom,
      prenom: adress.prenom,
      email: adress.email,
      tel: adress.tel
    })
  }
}
