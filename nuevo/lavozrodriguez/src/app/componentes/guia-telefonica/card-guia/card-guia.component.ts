import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-card-guia',
  templateUrl: './card-guia.component.html',
  styleUrls: ['./card-guia.component.css']
})
export class CardGuiaComponent {

  @Input() numeros: any[] = [];

  constructor(private sanitizer: DomSanitizer) {}




}
