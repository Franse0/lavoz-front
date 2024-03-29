import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Lugar } from '../models/lugares';

@Injectable({
  providedIn: 'root'
})
export class LugarService {


  url: string = "http://localhost:8080";
  // url: string = "http://62.72.26.208:8080/api";



  constructor(private http:HttpClient) { }

  lugarTodos():Observable<any>{
    return this.http.get(this.url+"/lugares");
  }

  lugarParticular(id:number):Observable<any>{
    return this.http.get(this.url+"/lugares/"+id);
  }

  lugarAgregar(local:Lugar):Observable<Lugar>{
    return this.http.post<Lugar>(this.url+"/lugares/cargar", local);
  }

  lugarBorrar(id:number):Observable<any>{
    return this.http.delete(this.url+"/lugares/borrar/"+id);
  }
  buscarLocales(parametro:String):Observable<any>{
    return this.http.get<any[]>(`${this.url}/lugar/buscar/${parametro}`)
  }
}
