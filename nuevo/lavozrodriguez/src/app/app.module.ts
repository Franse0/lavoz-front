import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { AdminHomeComponent } from './componentes/admin/admin-home/admin-home.component';
import { AdminNoticiasComponent } from './componentes/admin/admin-home/admin-noticias/admin-noticias.component';
import { AdminLugaresComponent } from './componentes/admin/admin-home/admin-lugares/admin-lugares.component';

// Firebas
import { initializeApp} from "firebase/app";
import { AngularFireModule } from '@angular/fire/compat';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// httpclient
import { HttpClientModule} from "@angular/common/http";
import { enviroment } from './enviroments/enviroments';
import { TelefonosComponent } from './componentes/admin/admin-home/telefonos/telefonos.component';
import { BackHomeComponent } from './componentes/admin/back-home/back-home.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminHomeComponent,
    AdminNoticiasComponent,
    AdminLugaresComponent,
    TelefonosComponent,
    BackHomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    
    AngularFireModule.initializeApp(enviroment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
