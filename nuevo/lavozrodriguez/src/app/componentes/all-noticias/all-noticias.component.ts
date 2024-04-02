import { ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Route, Router } from '@angular/router';
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


  constructor(private noticiaService:NoticiaService,private viewportScroller: ViewportScroller, private router:Router){}

  ngOnInit(): void {
    this.viewportScroller.scrollToPosition([0, 0]);
    if(this.router.url.includes("/admin-noticias")){
      this.mostrarId=true;
    }
    this.noticiaService.noticiasTodos().subscribe(data=>{
      this.noticias=data
      console.log(data)
    },(error)=>{
      console.error('Error al obtener noticias: ', error)
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
