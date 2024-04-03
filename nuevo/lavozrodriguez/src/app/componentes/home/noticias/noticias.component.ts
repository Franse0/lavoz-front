import { Component, OnInit } from '@angular/core';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.component.html',
  styleUrls: ['./noticias.component.css','..//home.component.css']
})
export class NoticiasComponent implements OnInit{
  noticias:any[]=[]
  constructor(private noticiasService:NoticiaService){}


  ngOnInit(): void {
    this.noticiasService.noticiasTodos().subscribe(data =>{
      // this.noticias = data.slice(3).reverse()
      this.noticias = data.reverse()
    })
  }
}
