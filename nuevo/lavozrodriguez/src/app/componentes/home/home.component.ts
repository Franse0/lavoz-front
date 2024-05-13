import { Component, OnInit } from '@angular/core';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
noticias:any;
noticias_mas:any;

  constructor(private noticiasService:NoticiaService){}

  ngOnInit(): void {
    this.noticiasService.noticiasTodos().subscribe(data=>{
      this.noticias=data.slice(-1)
      this.noticias_mas = data.slice(-4, -1).reverse();

    })
  }

}
