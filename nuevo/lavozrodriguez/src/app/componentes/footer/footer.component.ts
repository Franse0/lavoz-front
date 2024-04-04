import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EstadoCategoriaService } from 'src/app/services/estado-categoria.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  constructor(
    private estadoCategoriaService:EstadoCategoriaService,
    private router:Router,
  ){}
  mail(){}

  seleccionarCategoria(categoria: string) {
    console.log(categoria)
    this.estadoCategoriaService.setCategoriaSeleccionada(categoria);
    this.router.navigate(['/all-noticias'], { queryParams: { categoria: categoria } });
  }
}
