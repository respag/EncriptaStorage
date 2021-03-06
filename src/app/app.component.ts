import { Component, OnInit } from '@angular/core';
import { Permiso } from './permiso';
import { SessionStorageService } from 'ngx-webstorage';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Guardar en LocalSession un array encriptado con crypto-js';

  //Esto en una aplicación rera podría ser la respuesta de un Servicio REST
  miArray:Permiso[]=[
      {CodPermiso: "01", CodRol: "00", Descripcion: "COTIZAR-AUTO"},
      {CodPermiso: "21", CodRol: "01", Descripcion: "COTIZAR-SALUD"},
      {CodPermiso: "19", CodRol: "02", Descripcion: "COTIZAR-VIDA"},
      {CodPermiso: "22", CodRol: "05", Descripcion: "EMITIR-VIDA"},
      {CodPermiso: "38", CodRol: "03", Descripcion: "EMITIR-SALUD"},
      {CodPermiso: "41", CodRol: "04", Descripcion: "EMITIR-AUTO"}
  ];
  
  miArrayDesencriptado:string;
  
  constructor(private mySession:SessionStorageService){}

  ngOnInit() {
    //Encripta el arreglo y lo escribe en SessionStorage
    var ciphertext  = CryptoJS.AES.encrypt(JSON.stringify(this.miArray), 'miclave');
    this.mySession.store('array',ciphertext.toString()); 
 
    //Sólo si la sesion existe la lee, desencriptándola y asignándola a la propiedad miArrayDesencriptado, para ser
    //mostrada en la plantilla html a través de interpolación
    if(this.mySession.retrieve("array")!=null){
      var bytes  = CryptoJS.AES.decrypt(this.mySession.retrieve("array"), 'miclave');
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      this.miArrayDesencriptado = JSON.stringify(decryptedData);
    }
  }
}
