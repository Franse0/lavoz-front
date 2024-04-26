import { Component, OnInit } from '@angular/core';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css','..//home.component.css']
})
export class NoticiasComponent implements OnInit{
  noticias:any[]=[]
  screenWidth: number = window.innerWidth; // Ancho de la pantalla
  cantidadCargada: number = 0;

  constructor(private noticiasService:NoticiaService){}


  ngOnInit(): void {
    this.cargarNoticias(20); // Cargar inicialmente 20 noticias
  }

  cargarNoticias(cantidad: number): void {
    this.noticiasService.noticiasTodos().subscribe(data => {
      data.reverse(); // Asegurarse que las más recientes estén al principio
      let sliceStart = this.cantidadCargada;
      let sliceEnd = this.cantidadCargada + cantidad;

      // Ajustar según resolución al momento de la carga inicial
      if (this.screenWidth <= 700) {
        this.noticias.push(...data.slice(sliceStart + 1, sliceEnd + 1)); // Evitar el primer elemento inicialmente
      } else {
        this.noticias.push(...data.slice(sliceStart + 3, sliceEnd + 3)); // Evitar los tres primeros inicialmente
      }
      this.cantidadCargada += cantidad; // Actualizar el contador de cargados
    });
  }

  verMas() {
    console.log("masbien")
    this.cargarNoticias(15); // Cargar 15 noticias más cuando se llama a ver más
  }
}
