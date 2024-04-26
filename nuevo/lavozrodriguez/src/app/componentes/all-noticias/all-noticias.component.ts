import { ViewportScroller } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Noticia } from 'src/app/models/noticicia';
import { EstadoCategoriaService } from 'src/app/services/estado-categoria.service';
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
  categoriaSeleccionada: string="";


  constructor(private noticiaService:NoticiaService,
    private viewportScroller: ViewportScroller, 
    private router:Router,
    private estadoCategoriasService: EstadoCategoriaService,
){}

    ngOnInit(): void {
      if(this.router.url.includes("/admin-noticias")){
        this.mostrarId=true;
      }
      this.viewportScroller.scrollToPosition([0, 0]); 
      this.suscripcion = this.noticiaService.actualizacionNoticias$.subscribe((actualizacion) => {
        if (actualizacion) {
          // Recargar las noticias cuando se emite una actualización
          this.obtenerTodasLasNoticias();
        }
      }); 
      // Obtener la categoría seleccionada del servicio de estado de categorías
      this.estadoCategoriasService.categoriaSeleccionada$.subscribe(categoria => {
        this.categoriaSeleccionada = categoria;
        console.log("soy la categoira", this.categoriaSeleccionada)
        // Si hay una categoría seleccionada, filtrar las noticias por esa categoría
        if (categoria) {
          this.filtrarPorCategoria(categoria);
        } else {
          // De lo contrario, cargar todas las noticias
          this.obtenerTodasLasNoticias();
        }
      });
    }
  

  filtrarPorCategoria(categoria: string) {
    if(categoria==="todas"){
      console.log("la categoria es todas")
      this.noticiaService.noticiasTodos().subscribe(data=>{
        this.noticias=data.reverse()
      })
    } else{
      this.noticiaService.noticiasTodos().subscribe(
        (data: any[]) => {
          this.noticias = data.filter(noticia => noticia.categoria === categoria).reverse();
        },
        error => {
          console.error('Error al obtener las noticias:', error);
        }
      );
  
    }
  }
  obtenerTodasLasNoticias() {
    this.noticiaService.noticiasTodos().subscribe(
      (data: any[]) => {
        this.noticias = data.reverse();
      },
      error => {
        console.error('Error al obtener las noticias:', error);
      }
    );
  }
  editar(id: number,  event:Event) {
    event.preventDefault()
    console.log(id)
    this.noticiaService.changeNoticiaId(id);
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

}
