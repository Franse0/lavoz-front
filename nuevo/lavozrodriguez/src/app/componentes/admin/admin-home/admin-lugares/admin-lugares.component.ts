import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lugar } from 'src/app/models/lugares';
import { LugarService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-admin-lugares',
  templateUrl: './admin-lugares.component.html',
  styleUrls: ['./admin-lugares.component.css', '../../admin.component.css']
})
export class AdminLugaresComponent {
  formAdmin:FormGroup;

  constructor(private formBuilder:FormBuilder, private lugarService:LugarService){
    this.formAdmin = formBuilder.group({
      id:["",[]],
      nombre:["",[Validators.required]],
      telefono:["",[Validators.required]],
      ubicacion:["",[Validators.required]],
      ubicacion_map:["",[Validators.required]],
      horario:["",[Validators.required]],
      img:["",[Validators.required]],
      ruta_img:["",[Validators.required]],
      instagram:["",[]],
      facebook:["",[]],
    })
  }

  cargarLocal(){
    if (this.formAdmin.invalid) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
    const lugar:Lugar={
    id:this.formAdmin.value.id,
    nombre:this.formAdmin.value.nombre,
    telefono:this.formAdmin.value.telefono,
    ubicacion:this.formAdmin.value.ubicacion,
    ubicacion_map:this.formAdmin.value.ubicacion_map,
    horario:this.formAdmin.value.horario,
    img:this.formAdmin.value.img,
    ruta_img:this.formAdmin.value.ruta_img,
    instagram:this.formAdmin.value.instagram,
    facebook:this.formAdmin.value.facebook,
    }
    this.lugarService.lugarAgregar(lugar).subscribe()
    this.formAdmin.reset()
    alert("lugar cargado con exito")
  }
}
