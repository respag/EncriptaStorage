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
  miArray:Permiso[]=[{CodPermiso: "10", CodRol: "00", Descripcion: "COTIZAR-AUTO"},
  {CodPermiso: "27", CodRol: "00", Descripcion: "COTIZAR-SALUD"},
  {CodPermiso: "09", CodRol: "00", Descripcion: "COTIZAR-VIDA"},
  {CodPermiso: "12", CodRol: "00", Descripcion: "EMITIR-VIDA"},
  {CodPermiso: "28", CodRol: "00", Descripcion: "EMITIR-SALUD"},
  {CodPermiso: "11", CodRol: "00", Descripcion: "EMITIR-AUTO"}];
  
  miArrayDesencriptado:string;
  constructor(private mySession:SessionStorageService){}

  ngOnInit() {
    //Encripta el arreglo y lo escribe en SessionStorage
    var ciphertext  = CryptoJS.AES.encrypt(JSON.stringify(this.miArray), 'clavesecreta Mapfre');
    this.mySession.store('array',ciphertext.toString()); 
 
    //Sólo si la sesion existe la lee, desencriptándola y asignándola a la propiedad miArrayDesencriptado, para ser
    //mostrada en la plantilla html a través de interpolación
    if(this.mySession.retrieve("array")!=null){
      var bytes  = CryptoJS.AES.decrypt(this.mySession.retrieve("array"), 'clavesecreta Mapfre');
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      this.miArrayDesencriptado = JSON.stringify(decryptedData);
    }
  }
}
