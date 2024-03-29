import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

  constructor(private authService:AuthService){}

  logIn(email:string, password:string){
    this.authService.loginEmailPassword(email, password)
  }
}
