import { ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Noticia } from 'src/app/models/noticicia';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-all-noticias',
  templateUrl: './all-noticias.component.html',
  styleUrls: ['./all-noticias.component.css']
})
export class AllNoticiasComponent {
  noticias!: any[]; 
  mostrarId:boolean=false;
  private suscripcion: Subscription | undefined;


  constructor(private noticiaService:NoticiaService,private viewportScroller: ViewportScroller, private router:Router){}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
  
    // Suscribirse a las notificaciones de actualización de noticias
    this.suscripcion = this.noticiaService.actualizacionNoticias$.subscribe((actualizacion) => {
      if (actualizacion) {
        // Recargar las noticias cuando se emite una actualización
        this.cargarNoticias();
      }
    });
  
    // Verificar si estás en la ruta '/admin-noticias'
    if (this.router.url.includes("/admin-noticias")) {
      this.mostrarId = true;
    }
  
    // Cargar las noticias una vez, después de suscribirse y verificar la ruta
    this.cargarNoticias();
  }
  
  cargarNoticias(){
    this.noticiaService.noticiasTodos().subscribe(data=>{
      this.noticias=data
    })
  }
  borar(id:number, event:Event){
    event.preventDefault()
    if(window.confirm(`Seguro deseas eliminar el item con el id:${id}`)){
    this.noticiaService.noticiasBorrar(id).subscribe(data=>
      this.noticiaService.noticiasTodos().subscribe(data=>{
        this.noticias=data
        console.log(data)
      }))
}} 

  
  editar(id: number,  event:Event) {
    event.preventDefault()
    console.log(id)
    this.noticiaService.changeNoticiaId(id);
  }

}
