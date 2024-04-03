import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Telefonos } from '../models/telefonos';

@Injectable({
  providedIn: 'root'
})
export class TelefonosService {

   
  url: string = "http://localhost:8080";
  // url: string = "http://62.72.26.208:8080/api";



  constructor(private http:HttpClient) { }

  telefonosTodos():Observable<any>{
    return this.http.get(this.url+"/telefonos");
  }

  telefonoParticular(id:number):Observable<any>{
    return this.http.get(this.url+"/telefonos/"+id);
  }

  telefonoAgregar(telefono:Telefonos):Observable<Telefonos>{
    return this.http.post<Telefonos>(this.url+"/telefono/cargar", telefono);
  }

  telefonoBorrar(id:number):Observable<any>{
    return this.http.delete(this.url+"/telefono/borrar/"+id);
  }


}
