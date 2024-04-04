import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-card-lugar',
  templateUrl: './card-lugar.component.html',
  styleUrls: ['./card-lugar.component.css']
})
export class CardLugarComponent {
  @Input() comercios: any[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.comercios.forEach(comercio => {
      console.log(comercio)
    });
  }




}
