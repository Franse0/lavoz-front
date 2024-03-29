import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticia } from '../models/noticicia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

   
  url: string = "http://localhost:8080";
  // url: string = "http://62.72.26.208:8080/api";



  constructor(private http:HttpClient) { }

  noticiasTodos():Observable<any>{
    return this.http.get(this.url+"/noticias");
  }

  noticiasParticular(id:number):Observable<any>{
    return this.http.get(this.url+"/noticia/"+id);
  }

  noticiasAgregar(noticia:Noticia):Observable<Noticia>{
    console.log(noticia)
    return this.http.post<Noticia>(this.url+"/noticia/cargar", noticia);
  }

  noticiasBorrar(id:number):Observable<any>{
    return this.http.delete(this.url+"/noticia/borrar/"+id);
  }
}
