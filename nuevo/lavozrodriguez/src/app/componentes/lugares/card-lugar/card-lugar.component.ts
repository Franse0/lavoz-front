import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { LugarService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-card-lugar',
  templateUrl: './card-lugar.component.html',
  styleUrls: ['./card-lugar.component.css']
})
export class CardLugarComponent {
  @Input() comercios: any[] = [];
  lugaresTodos:any[]=[]
  sanitizedGoogleMapsUrl: SafeResourceUrl="";

  mostrarId:boolean=false
  constructor(private sanitizer: DomSanitizer,
    private router:Router,
     private lugaresService:LugarService) {}
     

  ngOnInit(): void {
    if (this.router.url.includes("/admin-lugares")) {
      this.mostrarId = true;
    }
    // console.log(this.comercios)  
    this.sanitizeNumeros(this.comercios);

  }


  sanitizeNumeros(comercios: any[]): void {
    const observables = comercios.map(comercio => {
      const ubicacionMap = comercio.ubicacion_map.toString();
      const sanitizedUrl = this.sanitizer.bypassSecurityTrustHtml(ubicacionMap);
      return this.sanitizeUbicacionMap(sanitizedUrl);
    });

    forkJoin(observables).subscribe(sanitizedMaps => {
      this.comercios = comercios.map((comercio, index) => ({
        ...comercio,
        ubicacion_map_sanitized: sanitizedMaps[index]
      }));
    });
  }

  sanitizeUbicacionMap(sanitizedUrl: SafeHtml): Observable<SafeHtml> {
    // Aquí podrías realizar cualquier otra operación de sanitización necesaria
    return of(sanitizedUrl);
  }

  editar(id: number,  event:Event) {
    event.preventDefault()
    this.lugaresService.changeNoticiaId(id);
  }

   
  borar(id:number){
    if(window.confirm(`Seguro deseas eliminar el item con el id:${id}`)){
      this.lugaresService.lugarBorrar(id).subscribe()
    }
  } 
}
