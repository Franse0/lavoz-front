import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Noticia } from 'src/app/models/noticicia';
import { NoticiaService } from 'src/app/services/noticia.service';

@Component({
  selector: 'app-admin-noticias',
  templateUrl: './admin-noticias.component.html',
  styleUrls: ['./admin-noticias.component.css', '../../admin.component.css']
})
export class AdminNoticiasComponent {
  formAdmin:FormGroup;

  constructor(private formBuilder:FormBuilder, private noticiaService:NoticiaService){
    this.formAdmin = formBuilder.group({
      id: ["", []],
      titulo: ["", [Validators.required]],
      cuerpo:["", [Validators.required]],  
      resumen: ["", [Validators.required]],
      fecha_publi: ["", [Validators.required]],
      img: ["", [Validators.required]],
      url_img: ["", [Validators.required]],
    })
  }

  decodeHtml(htmlString: string): string {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = htmlString;
    return textarea.value;
  }

  cargarNoticia(){
    if (this.formAdmin.invalid) {
      alert("Por favor, completa todos los campos obligatorios.");
      return;
    }
    const noticia:Noticia={
    id:this.formAdmin.value.id,
    titulo:this.formAdmin.value.titulo,
    cuerpo: this.decodeHtml(this.formAdmin.value.cuerpo),
    resumen:this.formAdmin.value.resumen,
    fecha_publi:this.formAdmin.value.fecha_publi,
    img:this.formAdmin.value.img,
    url_img:this.formAdmin.value.url_img,

    }
    console.log(noticia)
    this.noticiaService.noticiasAgregar(noticia).subscribe();
    alert("noticia cargada con exito");
    this.formAdmin.reset();
  }
}
