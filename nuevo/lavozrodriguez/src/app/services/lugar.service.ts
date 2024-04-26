import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Lugar } from '../models/lugares';

@Injectable({
  providedIn: 'root'
})
export class LugarService {


  // url: string = "http://localhost:8080";
  // url: string = "http://77.37.126.139:8080";
  url: string = "https://lavozdegr.com/api";



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


  private lugarIdSource = new BehaviorSubject<number | null>(null);
  currentLugarId = this.lugarIdSource.asObservable();
  changeNoticiaId(id: number) {
    this.lugarIdSource.next(id);
  }
}
