import { Component, OnInit } from '@angular/core';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
noticias:any;

  constructor(private noticiasService:NoticiaService){}

  ngOnInit(): void {
    this.noticiasService.noticiasTodos().subscribe(data=>{
      this.noticias=data.slice(-1)
      console.log("noticias", this.noticias)
      // this.noticias.forEach((noticia:any) => {
        // this.obtenerImagenDeNoticia(noticia.id)
      // });
    })
  }
  obtenerImagenDeNoticia(idNoticia: number): void {
    this.noticiasService.obtenerImagen(idNoticia).subscribe(
      imagen => {
        console.log(imagen)
      },  
      error => {
        console.error('Error al cargar la imagen:', error);
      }
    );
  }
}
