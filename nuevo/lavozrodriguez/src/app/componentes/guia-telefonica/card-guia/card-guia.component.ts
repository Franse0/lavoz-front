import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import { TelefonosService } from 'src/app/services/telefonos.service';

@Component({
  selector: 'app-card-guia',
  templateUrl: './card-guia.component.html',
  styleUrls: ['./card-guia.component.css']
})
export class CardGuiaComponent  implements OnInit{
  sanitizedGoogleMapsUrl: SafeResourceUrl="";
  @Input() numeros: any[] = [];
  numerosTodos:any[]=[]

  mostrarId:boolean=false;

  constructor(private sanitizer: DomSanitizer, private telefonosService:TelefonosService,
    private router:Router
  ) {}
  ngOnInit(): void {
    if (this.router.url.includes("/admin-telefonos")) {
      this.mostrarId = true;
    }

    this.sanitizeNumeros(this.numeros)
  }

  sanitizeNumeros(numeros: any[]): void {
    const observables = numeros.map(numero => {
      const ubicacionMap = numero.ubicacion_map.toString();
      const sanitizedUrl = this.sanitizer.bypassSecurityTrustHtml(ubicacionMap);
      return this.sanitizeUbicacionMap(sanitizedUrl);
    });

    forkJoin(observables).subscribe(sanitizedMaps => {
      this.numeros = numeros.map((numero, index) => ({
        ...numero,
        ubicacion_map_sanitized: sanitizedMaps[index]
      }));
    });
  }

  sanitizeUbicacionMap(sanitizedUrl: SafeHtml): Observable<SafeHtml> {
    // Aquí podrías realizar cualquier otra operación de sanitización necesaria
    return of(sanitizedUrl);
  }
// ngOnInit(): void {
//   if(this.router.url.includes("/admin-telefonos")){
//     this.mostrarId=true;
//     console.log(this.mostrarId)
//   }
//   this.telefonosService.telefonosTodos().subscribe(data=>{
//     this.numerosTodos=data
//     this.sanitizeNumeros(this.numerosTodos)
//   })
// }
// sanitizeNumeros(numeros:any[]): void {

//   numeros.forEach(numero => {
//     const ubicacionMap = numero.ubicacion_map.toString();
//     const sanitizedUrl = this.sanitizer.bypassSecurityTrustHtml(ubicacionMap);
//     numero.ubicacion_map_sanitized = sanitizedUrl; // Reemplazar el valor de ubicacion_map con la URL sanitizada
//     console.log(numero.ubicacion_map_sanitized)
//     console.log("hola")
//   });
// }

  editar(id: number,  event:Event) {
    event.preventDefault()
    console.log(id)
    this.telefonosService.changeTelefonoId(id);
  }

   
  borar(id:number){
    if(window.confirm(`Seguro deseas eliminar el item con el id:${id}`)){
      this.telefonosService.telefonoBorrar(id).subscribe()
    }
  } 
}



// ngOnInit(): void {
//   if(this.router.url.includes("/admin-telefonos")){
//     this.mostrarId=true;
//     console.log(this.mostrarId)
//   }
//   this.telefonosService.telefonosTodos().subscribe(data=>{
//     this.numerosTodos=data
//     this.sanitizeNumeros(this.numerosTodos)
//   })
// }
// sanitizeNumeros(numeros:any[]): void {

//   numeros.forEach(numero => {
//     const ubicacionMap = numero.ubicacion_map.toString();
//     const sanitizedUrl = this.sanitizer.bypassSecurityTrustResourceUrl(ubicacionMap);
//     numero.ubicacion_map_sanitized = sanitizedUrl; // Reemplazar el valor de ubicacion_map con la URL sanitizada
//     console.log(numero.ubicacion_map_sanitized)
//     console.log("hola")
//   });
// }

// SafeHtmlImpl {changingThisBreaksApplicationSecurity: "<iframe src='https://www.google.com/maps/embed?pb=…rrerpolicy='no-referrer-when-downgrade'></iframe>"