import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClimaService } from 'src/app/services/clima.service';
import { NoticiaService } from 'src/app/services/noticia.service';
import { MatDialog } from '@angular/material/dialog';
import { FarmaciamodalComponent } from '../farmaciamodal/farmaciamodal.component';
import { EstadoCategoriaService } from 'src/app/services/estado-categoria.service';
import { Router } from '@angular/router';
import { DolarService } from 'src/app/services/dolar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  clima:any;
  dolar:any;
  fechaActual: Date | undefined;
  fechaFormateada: string | undefined;

  constructor(private climaService:ClimaService,
              private noticiaService:NoticiaService,
              public dialog: MatDialog,
              private estadoCategoriaService:EstadoCategoriaService,
              private router:Router,
              private dolarService:DolarService){}
  ngOnInit(): void {
    this.fechaActual = new Date();
    this.fechaFormateada = this.formatoFecha(this.fechaActual);
    this.climaService.getWeather().subscribe(data=>{
      this.clima=data
    })
    this.dolarService.getDolar().subscribe(data=>{
      this.dolar=data
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


  openModal(event:Event): void {
    event.preventDefault()
    const dialogRef = this.dialog.open(FarmaciamodalComponent, {
      width: '80%', // Ancho del modal
      height: '80%', // Altura del modal
      panelClass: 'custom-dialog-container' // Clase CSS personalizada para el modal
    });
  }

  seleccionarCategoria(categoria: string) {
    this.estadoCategoriaService.setCategoriaSeleccionada(categoria);
    this.mostrarMenu = false;
    this.router.navigate(['/all-noticias'], { queryParams: { categoria: categoria } });
  }

  formatearCategoria() {
    this.estadoCategoriaService.setCategoriaSeleccionada("todas"); // o tu valor predeterminado que indica sin filtro
    // Navegar a AllNoticias para forzar la recarga
    this.mostrarMenu = false;
  };

  closeMenu(){
    this.mostrarMenu = false;
  }

  
  buscar() {
    // Verifica si el elemento input existe y tiene un valor
    if (this.buscador && this.buscador.nativeElement.value) {
      const busquedaValue = this.buscador.nativeElement.value;
      this.buscador.nativeElement.value=''  
      // Usar el servicio Router para navegar
      this.router.navigate(['/resultados-busqueda'], { queryParams: { categoria: busquedaValue } });
    } else {
      this.buscarValue = !this.buscarValue;
    }
  }
  buscarConEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.buscar();
    }
  }
}
