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
import { HeaderComponent } from './componentes/header/header.component';
import { HomeComponent } from './componentes/home/home.component';
import { AsideComponent } from './componentes/aside/aside.component';
import { NoticiasComponent } from './componentes/home/noticias/noticias.component';
import { PaginaComponent } from './componentes/pagina/pagina.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { AllNoticiasComponent } from './componentes/all-noticias/all-noticias.component';
import { NoticiaIndComponent } from './componentes/all-noticias/noticia-ind/noticia-ind.component';
import { GuitaTelefonicaComponent } from './componentes/guia-telefonica/guia-telefonica.component';
import { CardGuiaComponent } from './componentes/guia-telefonica/card-guia/card-guia.component';
import { FarmaciamodalComponent } from './componentes/farmaciamodal/farmaciamodal.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { LugaresComponent } from './componentes/lugares/lugares.component';
import { CardLugarComponent } from './componentes/lugares/card-lugar/card-lugar.component';
import { ResultadoBusquedaComponent } from './componentes/resultado-busqueda/resultado-busqueda.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AdminHomeComponent,
    AdminNoticiasComponent,
    AdminLugaresComponent,
    TelefonosComponent,
    BackHomeComponent,
    HeaderComponent,
    HomeComponent,
    AsideComponent,
    NoticiasComponent,
    PaginaComponent,
    FooterComponent,
    AllNoticiasComponent,
    NoticiaIndComponent,
    GuitaTelefonicaComponent,
    CardGuiaComponent,
    FarmaciamodalComponent,
    LugaresComponent,
    CardLugarComponent,
    ResultadoBusquedaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    AngularFireModule.initializeApp(enviroment.firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
