import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-resultado-busqueda',
  templateUrl: './resultado-busqueda.component.html',
  styleUrls: ['./resultado-busqueda.component.css']
})
export class ResultadoBusquedaComponent implements OnInit{

  parametroBusqueda:any="";
  busquedaList:any[]=[]
  noResultados:boolean=false
  siResultados:boolean=false
  constructor( private route:ActivatedRoute
    ,private noticiasService:NoticiaService,
    private router:Router,
  ){

  }
  ngOnInit(): void {
    this.noResultados=false
    this.route.queryParams.subscribe(params => {  
      this.parametroBusqueda = params['categoria'];
      this.noticiasService.buscarNoticia(this.parametroBusqueda).subscribe(data => {
        if(data.length> 0){
          this.busquedaList=[]
          this.busquedaList=data;
          this.noResultados=false
          this.siResultados=true

        }else{
          this.noResultados=true
          this.siResultados=false

        }
      });
    })
  }

  ira(id:number){
    this.router.navigate(['noticia', id])
  }
}
