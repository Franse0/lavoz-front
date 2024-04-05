import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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

  constructor(private sanitizer: DomSanitizer, private lugaresService:LugarService) {}

  ngOnInit(): void {
    this.lugaresService.lugarTodos().subscribe(data=>{
      this.lugaresTodos=data
      if (this.lugaresTodos.length > 0) {
        const iframeCode = this.lugaresTodos[0].ubicacion_map; // Ajusta el nombre según tus datos reales
        this.sanitizeHtmlContent(iframeCode.toString());
      }
    })
  }

  sanitizeHtmlContent(html: string): void {
    this.sanitizedGoogleMapsUrl = this.sanitizer.bypassSecurityTrustHtml(html);
  }




}
