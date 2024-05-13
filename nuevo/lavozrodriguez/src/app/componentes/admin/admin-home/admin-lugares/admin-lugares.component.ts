import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Lugar } from 'src/app/models/lugares';
import { LugarService } from 'src/app/services/lugar.service';

@Component({
  selector: 'app-admin-lugares',
  templateUrl: './admin-lugares.component.html',
  styleUrls: ['./admin-lugares.component.css', '../../admin.component.css']
})
export class AdminLugaresComponent implements OnInit{
  formAdmin:FormGroup;
  forEdit:any;
  constructor(private formBuilder:FormBuilder, private lugarService:LugarService){
    this.formAdmin = formBuilder.group({
      id:["",[]],
      nombre:["",[Validators.required]],
      telefono:["",[Validators.required]],
      ubicacion:["",[Validators.required]],
      ubicacion_map:["",[Validators.required]],
      horario:["",[Validators.required]],
      ruta_img:["",[Validators.required]],
      ruta_img2:["",[Validators.required]],
      instagram:["",[]],
      facebook:["",[]],
      categoria:["",[]],
    })
  }
  ngOnInit(): void {
    this.lugarService.currentLugarId.subscribe(id => {
      // Aquí tienes el id, y puedes hacer algo con él.
      console.log("id de edicion", id);
      if(id){
        this.getForEdit(id)
      }
    });
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
    ruta_img:this.formAdmin.value.ruta_img,
    ruta_img2:this.formAdmin.value.ruta_img2,
    instagram:this.formAdmin.value.instagram,
    facebook:this.formAdmin.value.facebook,
    categoria:this.formAdmin.value.categoria,
    }
    this.lugarService.lugarAgregar(lugar).subscribe()
    this.formAdmin.reset()
    alert("lugar cargado con exito")
  }


  
  
  getForEdit(id:number){
    
    this.lugarService.lugarParticular(id).subscribe(data=>{
      this.forEdit=data;
      console.log(this.forEdit)
      this.formAdmin.patchValue({
        id:this.forEdit.id,
        nombre:this.forEdit.nombre,
        telefono: this.forEdit.telefono,
        ubicacion:this.forEdit.ubicacion,
        ubicacion_map:this.forEdit.ubicacion_map,
        horario:this.forEdit.horario,
        ruta_img:this.forEdit.ruta_img,
        ruta_img2:this.forEdit.ruta_img2,
        instagram:this.forEdit.instagram,
        facebook:this.forEdit.facebook,
        categoria:this.forEdit.categoria,
      })
    })
}
}
