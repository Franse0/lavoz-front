import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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

  constructor(private sanitizer: DomSanitizer, private telefonosService:TelefonosService) {}

  ngOnInit(): void {
    this.telefonosService.telefonosTodos().subscribe(data=>{
      this.numerosTodos=data
      if (this.numerosTodos.length > 0) {
        const iframeCode = this.numerosTodos[0].ubicacion_map; // Ajusta el nombre según tus datos reales
        this.sanitizeHtmlContent(iframeCode.toString());
      }
    })
  }

  sanitizeHtmlContent(html: string): void {
    this.sanitizedGoogleMapsUrl = this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
