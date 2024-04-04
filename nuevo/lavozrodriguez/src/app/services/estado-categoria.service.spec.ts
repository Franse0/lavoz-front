import { TestBed } from '@angular/core/testing';

import { EstadoCategoriaService } from './estado-categoria.service';

describe('EstadoCategoriaService', () => {
  let service: EstadoCategoriaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoCategoriaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
