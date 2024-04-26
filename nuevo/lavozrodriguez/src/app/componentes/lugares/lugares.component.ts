import { ViewportScroller } from '@angular/common';
import { Component } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LugarService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})
export class LugaresComponent {
  
  restauranteBar:boolean=false
  cafeteria:boolean=false
  centroDeportivo:boolean=false
  correo:boolean=false  
  ferreteria:boolean=false  
  gomeria:boolean=false  
  pagoFacil:boolean=false  
  veterinaria:boolean=false  

  restaruanteList: any[] = [];
  cafeteriaList: any[] = [];
  centroDeportivoList: any[] = [];
  correoList: any[] = [];
  ferreteriaList: any[] = [];
  gomeriaList: any[] = [];
  pagoFacilList: any[] = [];
  veterinariasList: any[] = [];

  parametroDeRuta: any="";
  sanitizedGoogleMapsUrl: SafeResourceUrl="";

  constructor(private lugaresService:LugarService,
              private route:ActivatedRoute,
              private viewScroll:ViewportScroller){}

  ngOnInit(): void {
    this.viewScroll.scrollToPosition([0,0])
    this.chequearParametro()
    this.lugaresService.lugarTodos().subscribe(data => {    
      data.forEach((comercio: any) => {
        switch(comercio.categoria) {
          case 'restaurante-bar':
            this.restaruanteList.push(comercio);
            break;
          case 'cafeteria':
            this.cafeteriaList.push(comercio);
            break;
          case 'centro_deportivo':
            this.centroDeportivoList.push(comercio);
            break;
          case 'correo':
            this.correoList.push(comercio);
            break;
          case 'ferreteria':
            this.ferreteriaList.push(comercio);
            break;
          case 'gomeria':
            this.gomeriaList.push(comercio);
            break;
          case 'pago-facil':
            this.pagoFacilList.push(comercio);
            break;
          case 'veterinaria':
            this.veterinariasList.push(comercio);
            break;
        }
      });
    });
  }

  chequearParametro(){
    this.route.queryParams.subscribe(params => {
      this.parametroDeRuta = params['categoria'];
      console.log("soy el parametro",this.parametroDeRuta)
      switch(this.parametroDeRuta){
        case "bar/restaurante":
          this.restauranteBar=true
          break;
        case "cafeteria":
          this.cafeteria=true;
          break;
        case "centro-deportivo":
          console.log("daleeeeee")
          this.centroDeportivo=true;
          console.log(this.centroDeportivo)
          break;
        case "correo":
          this.correo=true;     
          break;
        case "ferreteria":
          this.ferreteria=true;     
          break;
        case "gomeria":
          this.gomeria=true;     
          break;
        case "pago-facil":
          this.pagoFacil=true;     
          break;
        case "veterinaria":
          this.veterinaria=true;     
          break;
      }
    });
  }
  guiaRestarurantes(){
    this.restauranteBar=!this.restauranteBar
    console.log(this.restaruanteList)
  }
  guiaCafeteria(){
    this.cafeteria=!this.cafeteria
  }
  guiaCentrosDeportivos(){  
    this.centroDeportivo=!this.centroDeportivo
  }
  guiaCorreo(){
    this.correo=!this.correo
  }
  guiaFerreteria(){
    this.ferreteria=!this.ferreteria
  }
  guiaGomeria(){
    this.gomeria=!this.gomeria
  }
  guiaPagoFacil(){
    this.pagoFacil=!this.pagoFacil
  }
  guiaVeterinaria(){
    this.veterinaria=!this.veterinaria
  }

  
  
}
