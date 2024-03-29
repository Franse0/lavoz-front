import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './componentes/admin/admin.component';
import { AdminHomeComponent } from './componentes/admin/admin-home/admin-home.component';
import { AdminNoticiasComponent } from './componentes/admin/admin-home/admin-noticias/admin-noticias.component';
import { AdminLugaresComponent } from './componentes/admin/admin-home/admin-lugares/admin-lugares.component';
import { AuthGuard } from './guard/auth.guard';
import { TelefonosComponent } from './componentes/admin/admin-home/telefonos/telefonos.component';

const routes: Routes = [
  {path:"admin", component:AdminComponent},
  {path:"admin-home", component:AdminHomeComponent, canActivate:[AuthGuard]},
  {path:"admin-lugares", component:AdminLugaresComponent, canActivate:[AuthGuard]},
  {path:"admin-noticias", component:AdminNoticiasComponent, canActivate:[AuthGuard]},
  {path:"admin-telefonos", component:TelefonosComponent, canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
