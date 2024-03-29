import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Telefonos } from 'src/app/models/telefonos';
import { TelefonosService } from 'src/app/services/telefonos.service';

@Component({
  selector: 'app-telefonos',
  templateUrl: './telefonos.component.html',
  styleUrls: ['./telefonos.component.css','../../admin.component.css']
})
export class TelefonosComponent {
  formAdmin:FormGroup;

  constructor(private formBuilder:FormBuilder, private telefonosService:TelefonosService){
    this.formAdmin = formBuilder.group({
      id: ["", []],
      nombre: ["", [Validators.required]],
      telefono_prin:["", [Validators.required]],  
      telefonos: ["", [Validators.required]],
      ubicacion_map: ["", [Validators.required]],
    })
  }


  cargarTelefono(){
    if (this.formAdmin.invalid) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
    const telefono:Telefonos={
      id:this.formAdmin.value.id,
      nombre:this.formAdmin.value.nombre,
      telefono_prin:this.formAdmin.value.telefono_prin,
      telefonos:this.formAdmin.value.telefonos,
      ubicacion_map:this.formAdmin.value.ubicacion_map,
    }
    this.telefonosService.telefonoAgregar(telefono).subscribe()
    this.formAdmin.reset()

    alert("Telefono cargado con exito");
  }
}
