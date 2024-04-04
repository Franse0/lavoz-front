import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadoCategoriaService {

  private categoriaSeleccionadaSubject = new BehaviorSubject<string>('');
  categoriaSeleccionada$ = this.categoriaSeleccionadaSubject.asObservable();

    constructor() { }

  setCategoriaSeleccionada(categoria: string) {
    this.categoriaSeleccionadaSubject.next(categoria);
  }

  getCategoriaSeleccionada(): string {
    return this.categoriaSeleccionadaSubject.getValue();
  }

}
