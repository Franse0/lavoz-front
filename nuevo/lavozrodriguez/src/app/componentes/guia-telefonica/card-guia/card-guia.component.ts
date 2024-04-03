import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-card-guia',
  templateUrl: './card-guia.component.html',
  styleUrls: ['./card-guia.component.css']
})
export class CardGuiaComponent implements OnInit{

  @Input() numeros: any[] = [];
  numerosProcesados: any[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.numeros.forEach(numero => {
      // Procesar los teléfonos de cada número
      const telefonosProcesados = this.procesarTelefonos(numero.telefonos);
      // Sanitizar el HTML del mapa
      // const ubicacionMapSanitizada = this.sanitizer.bypassSecurityTrustHtml(numero.ubicacion_map.toString());;
      // Agregar al array con todos los datos procesados
      this.numerosProcesados.push({
        ...numero,
        telefonos: telefonosProcesados,
        ubicacion_map_sanitizada:this.sanitizer.bypassSecurityTrustHtml(numero.ubicacion_map.toString())
      });
      console.log(this.numerosProcesados)
    });
  }

  procesarTelefonos(telefonos: string): string[] {
    return telefonos.split(',').map(telefono => telefono.trim());
  }


}
