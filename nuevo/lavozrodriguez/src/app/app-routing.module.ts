import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './componentes/admin/admin.component';
import { AdminHomeComponent } from './componentes/admin/admin-home/admin-home.component';
import { AdminNoticiasComponent } from './componentes/admin/admin-home/admin-noticias/admin-noticias.component';
import { AdminLugaresComponent } from './componentes/admin/admin-home/admin-lugares/admin-lugares.component';
import { AuthGuard } from './guard/auth.guard';
import { TelefonosComponent } from './componentes/admin/admin-home/telefonos/telefonos.component';
import { PaginaComponent } from './componentes/pagina/pagina.component';
import { AllNoticiasComponent } from './componentes/all-noticias/all-noticias.component';
import { NoticiaIndComponent } from './componentes/all-noticias/noticia-ind/noticia-ind.component';
import { GuitaTelefonicaComponent } from './componentes/guia-telefonica/guia-telefonica.component';
import { LugaresComponent } from './componentes/lugares/lugares.component';

const routes: Routes = [
  {path:"admin", component:AdminComponent},
  {path:"admin-home", component:AdminHomeComponent, canActivate:[AuthGuard]},
  {path:"admin-lugares", component:AdminLugaresComponent, canActivate:[AuthGuard]},
  {path:"admin-noticias", component:AdminNoticiasComponent, canActivate:[AuthGuard]},
  {path:"admin-telefonos", component:TelefonosComponent, canActivate:[AuthGuard]},
  {path:"pagina-principal", component:PaginaComponent, },

  {path:"all-noticias", component:AllNoticiasComponent},
  {path:"noticia/:id", component:NoticiaIndComponent},

  {path:"guia-telefonica", component:GuitaTelefonicaComponent},
  {path:"guia-comercios", component:LugaresComponent},




  {path:"**", redirectTo: "/pagina-principal", pathMatch:"full"},
  {path:"", redirectTo: "pagina-principal", pathMatch:"full"},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
