import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Telefonos } from 'src/app/models/telefonos';
import { TelefonosService } from 'src/app/services/telefonos.service';

@Component({
  selector: 'app-telefonos',
  templateUrl: './telefonos.component.html',
  styleUrls: ['./telefonos.component.css','../../admin.component.css']
})
export class TelefonosComponent  implements OnInit{
  formAdmin:FormGroup;
  forEdit:any;

  constructor(private formBuilder:FormBuilder, private telefonosService:TelefonosService){
    this.formAdmin = formBuilder.group({
      id: ["", []],
      nombre: ["", [Validators.required]],
      telefono_prin:["", [Validators.required]],  
      telefonos: ["", [Validators.required]],
      ubicacion_map: ["", [Validators.required]],
      ubicacion: ["", [Validators.required]],
      categoria: ["", [Validators.required]],
    })
  }
  ngOnInit(): void {
    this.telefonosService.currentTelefonoId.subscribe(id => {
      // Aquí tienes el id, y puedes hacer algo con él.
      console.log("id de edicion", id);
      if(id){
        this.getForEdit(id)
      }
    });
  }

  
  getForEdit(id:number){
    
    this.telefonosService.telefonoParticular(id).subscribe(data=>{
      this.forEdit=data;
      console.log(this.forEdit)
      this.formAdmin.patchValue({
        id:this.forEdit.id,
        nombre:this.forEdit.nombre,
        telefono_prin: this.forEdit.telefono_prin,
        telefonos:this.forEdit.telefonos,
        ubicacion_map:this.forEdit.ubicacion_map,
        ubicacion:this.forEdit.ubicacion,
        categoria:this.forEdit.categoria,
      })
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
      ubicacion:this.formAdmin.value.ubicacion,
      categoria:this.formAdmin.value.categoria,
    }
    this.telefonosService.telefonoAgregar(telefono).subscribe({
      next: (response) => {
        // this.formAdmin.reset();
        alert("Teléfono cargado con éxito");
      },
      error: (err) => {
        console.error(err);
        alert("Hubo un error al cargar el teléfono. Por favor, intenta nuevamente.");
      }
    });
  }
}
