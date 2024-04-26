import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Noticia } from '../models/noticicia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {

   
  // url: string = "http://77.37.126.139:8080";
  url: string = "https://lavozdegr.com/api";

  
  private actualizacionNoticiasSource = new BehaviorSubject<boolean>(false);
  actualizacionNoticias$ = this.actualizacionNoticiasSource.asObservable();

   // Agregar un método para notificar actualizaciones
   notificarActualizacionDeNoticias() {
    this.actualizacionNoticiasSource.next(true);
  }

  constructor(private http:HttpClient) { }

  noticiasTodos():Observable<any>{
    return this.http.get(this.url+"/noticias");
  }
  obtenerImagen(idNoticia: number): Observable<Blob> {
    return this.http.get(`${this.url}/noticia/imagen/${idNoticia}`, { responseType: 'blob' });
  }
  noticiasParticular(id:number):Observable<any>{
    return this.http.get(this.url+"/noticia/"+id);
  }


  noticiasAgregar(noticia:Noticia): Observable<Noticia> {
    return this.http.post<Noticia>(this.url + "/noticia/cargar", noticia);
  }
  noticiasBorrar(id:number):Observable<any>{
    return this.http.delete(this.url+"/noticia/borrar/"+id);
  }

  
  buscarNoticia(parametro:string):Observable<any>{
    return this.http.get<any[]>(`${this.url}/noticia/buscar/${parametro}`)
  }
  private noticiaIdSource = new BehaviorSubject<number | null>(null);
  currentNoticiaId = this.noticiaIdSource.asObservable();
  
  changeNoticiaId(id: number) {
    this.noticiaIdSource.next(id);
  }
  
}
