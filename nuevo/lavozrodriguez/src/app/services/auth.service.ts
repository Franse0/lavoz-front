import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any;

  constructor(
    private firebaseAuthenticationService:AngularFireAuth,
    private router:Router,
    private ngZone:NgZone
  ) {
    this.firebaseAuthenticationService.authState.subscribe((user)=>{
      if(user){
        this.userData = user
        localStorage.setItem('user', JSON.stringify(this.userData))  
      }else{
        localStorage.setItem('user', 'null')
      }
    })
   }

   loginEmailPassword(email:string, pasword:string){
    this.firebaseAuthenticationService.signInWithEmailAndPassword(email, pasword)
      .then(userCredential=>{
        this.userData= userCredential.user;
        this.observeUserState()
      })
   }


   observeUserState(){
    this.firebaseAuthenticationService.authState.subscribe(userState=>{
      userState&&this.ngZone.run(()=>this.router.navigate(['admin-home']))
    })
   }

   get isLoggedIn():boolean{
    const user  = JSON.parse(localStorage.getItem('user')!)
    return user !== null
  }

  logOut(){
    return this.firebaseAuthenticationService.signOut()
      .then(()=>{
        localStorage.removeItem('user')
        this.router.navigate(['admin'])
      })
  }
}
