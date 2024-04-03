import { Component, OnInit } from '@angular/core';
import { TelefonosService } from 'src/app/services/telefonos.service';

@Component({
  selector: 'app-guia-telefonica',
  templateUrl: './guia-telefonica.component.html',
  styleUrls: ['./guia-telefonica.component.css']
})
export class GuitaTelefonicaComponent  implements OnInit{

    cultura:boolean=false
    salud:boolean=false
    seguridad:boolean=false
    personas:boolean=false

    culturaList: any[] = [];
    saludList: any[] = [];
    seguridadList: any[] = [];
    personasList: any[] = [];

    constructor(private telefonoService:TelefonosService){}

    ngOnInit(): void {
      this.telefonoService.telefonosTodos().subscribe(data => {    
        data.forEach((numero: any) => {
          switch(numero.categoria) {
            case 'cultura':
              this.culturaList.push(numero);
              break;
            case 'personas':
              this.personasList.push(numero);
              break;
            case 'salud':
              this.saludList.push(numero);
              break;
            case 'seguridad':
              this.seguridadList.push(numero);
              break;
          }
        });
      });
    }
    guiaCultura(){
      this.cultura=!this.cultura
    }
    guiaSalud(){
      this.salud=!this.salud
    }
    guiaSeguridad(){  
      this.seguridad=!this.seguridad
    }
    guiaPersonas(){
      this.personas=!this.personas
    }

    
}