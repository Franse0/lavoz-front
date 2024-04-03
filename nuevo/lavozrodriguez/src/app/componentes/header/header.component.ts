import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClimaService } from 'src/app/services/clima.service';
import { NoticiaService } from 'src/app/services/noticia.service';
import { MatDialog } from '@angular/material/dialog';
import { FarmaciamodalComponent } from '../farmaciamodal/farmaciamodal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  clima:any;
  fechaActual: Date | undefined;
  fechaFormateada: string | undefined;

  constructor(private climaService:ClimaService,
               private noticiaService:NoticiaService,
               public dialog: MatDialog){}
  ngOnInit(): void {
    this.fechaActual = new Date();
    this.fechaFormateada = this.formatoFecha(this.fechaActual);
    this.climaService.getWeather().subscribe(data=>{
      this.clima=data
    })
  }
  mostrarMenu: boolean = false; // Controla la visibilidad del menú completo
  guia:boolean=false;
  noticias:boolean=false;
  comercios:boolean=false;
  buscarValue:boolean=false;

  @ViewChild('buscador') buscador: ElementRef | undefined;
  

  menu(){
    this.mostrarMenu=!this.mostrarMenu  
    this.comercios=false
    this.noticias=false
    this.guia=false
  }

  submenuGuia(){
    this.guia=!this.guia
  }
  submenuNoticias(){
    this.noticias=!this.noticias
  }
  submenuComercios(){
    this.comercios=!this.comercios
  }


  convertCelcius(kelvin:number){
    let celcius  = Math.round(kelvin - 273.15);
    return celcius;
  }

  formatoFecha(fecha: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: '2-digit' };
    const formatoLocal = fecha.toLocaleDateString('es-ES', options);
    return formatoLocal.charAt(0).toUpperCase() + formatoLocal.slice(1); // Capitalizar primera letra del mes
  }

  buscar() {
    // Verifica si el elemento input existe y tiene un valor
    if (this.buscador && this.buscador.nativeElement.value) {
      console.log('estoy buscando', this.buscador.nativeElement.value)
      this.noticiaService.buscarNoticia(this.buscador.nativeElement.value).subscribe(data => {
        console.log(data);
      });
    } else {
      this.buscarValue = !this.buscarValue;
      console.log(this.buscarValue);
    }
  }

  openModal(event:Event): void {
    event.preventDefault()
    const dialogRef = this.dialog.open(FarmaciamodalComponent, {
      width: '80%', // Ancho del modal
      height: '80%', // Altura del modal
      panelClass: 'custom-dialog-container' // Clase CSS personalizada para el modal
    });
  }
}
