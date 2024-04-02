import { Component } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { NoticiaService } from 'src/app/services/noticia.service';
import { Noticia } from 'src/app/models/noticicia';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-noticia-ind',
  templateUrl: './noticia-ind.component.html',
  styleUrls: ['./noticia-ind.component.css']
})
export class NoticiaIndComponent {
  noticia:Noticia | undefined;
  noticiaAside!: any[];
  noticiasMas:Noticia[] | undefined;

  constructor(private noticiaService:NoticiaService ,private route:ActivatedRoute,private viewportScroller: ViewportScroller){}
  ngOnInit(): void {

    this.getNoticiasAside()
    this.viewportScroller.scrollToPosition([0, 0]);
    this.route.params.subscribe(params=>{
      const noticiaId= params['id'];
      this.noticiaService.noticiasParticular(noticiaId).subscribe(data=>{
        this.noticia=data
        this.noticiaAside = this.limitToMax3(this.noticiaAside.filter(noticia => noticia.id !== data.id));
      })
    })
  }
  capturarValor(id:number){
    this.viewportScroller.scrollToPosition([0, 0]);
    // const id = Number((event.target as HTMLElement).id);
    if (id !== 0) {
      console.log(id);
      this.noticiaService.noticiasParticular(id).subscribe(data => {
        this.noticia = data;
        console.log("data", data);
        this.getNoticiasAside();
      });
    }
  }
  getNoticiasAside() {
    this.noticiaService.noticiasTodos().subscribe((data: Noticia[]) => {
      this.noticiasMas=data.reverse()
      this.noticiaAside=data
      // Limitar el número de noticiasAside y asegurarse de que no contenga la noticia actual
      // this.noticiaAside = this.limitToMax3(this.noticiaAside.filter(noticia => noticia.id !== noticia.id));
     this.noticiaAside = this.limitToMax3(this.shuffleArray(data.filter((noticia: Noticia) => noticia.id !== this.noticia?.id)));
    });
  }
  limitToMax3(arr: Noticia[]): Noticia[] {
    return arr.slice(0, 3);
  }
   // Método para barajar aleatoriamente un array (Algoritmo de Fisher-Yates)
shuffleArray(arr: any[]): any[] {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
}
