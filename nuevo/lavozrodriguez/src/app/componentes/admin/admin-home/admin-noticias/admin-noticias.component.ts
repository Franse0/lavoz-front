import { Component, OnInit } from '@angular/core';
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
  forEdit:any;

  
  constructor(private formBuilder:FormBuilder, private noticiaService:NoticiaService){
    this.formAdmin = formBuilder.group({
      id: ["", []],
      titulo: ["", [Validators.required]],
      cuerpo:["", [Validators.required]],  
      resumen: ["", [Validators.required]],
      fecha_publi: ["", [Validators.required]],
      img: ["", [Validators.required]],
      url_img: ["", [Validators.required]],
      categoria: ["", [Validators.required]],
    })
  }
  ngOnInit(): void {
    this.noticiaService.currentNoticiaId.subscribe(id => {
      // Aquí tienes el id, y puedes hacer algo con él.
      console.log("id de edicion", id);
      if(id){
        this.getForEdit(id)
      }
    });
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
    categoria:this.formAdmin.value.categoria,

    }
    console.log(noticia)
    this.noticiaService.noticiasAgregar(noticia).subscribe(()=>{
      alert("noticia cargada con exito");
      this.formAdmin.reset();
      this.noticiaService.notificarActualizacionDeNoticias()
    });
    
  }

  getForEdit(id:number){
    
      this.noticiaService.noticiasParticular(id).subscribe(data=>{
        this.forEdit=data;
        console.log(this.forEdit)
        this.formAdmin.patchValue({
          id:this.forEdit.id,
          titulo:this.forEdit.titulo,
          cuerpo: this.forEdit.cuerpo,
          resumen:this.forEdit.resumen,
          fecha_publi:this.forEdit.fecha_publi,
          img:this.forEdit.img,
          url_img:this.forEdit.url_img,
          categoria:this.forEdit.categoria,
        })
      })
  }
        
      

        
}
