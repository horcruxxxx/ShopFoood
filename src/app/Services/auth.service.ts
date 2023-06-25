import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

//INTERFFACE FOR SIGNUP REQUEST's RESPONSE
interface AuthResponseSingup {
  'idToken':string,	
  'email':	string,
  'refreshToken':	string,	
  'expiresIn'	:string,	
  'localId':string
}

//INTERFFACE FOR LOGIN REQUEST's RESPONSE
interface AuthResponseLogin{
  'idToken':	string,	
  'email'	:string,	
  'refreshToken':	string,	
  'expiresIn':	string,
  'localId':	string,
  'registered':	boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public token:string = null;
  token_available = new EventEmitter<null>();
  constructor(private http:HttpClient) {}

  signUp(email:string,password:string){
    return this.http.post<AuthResponseSingup>("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAve9yJolUkU8hN9zmEI0A_UOJu-b9vkFE",{
      'email':email,
      'password':password,
      'returnSecureToken':true
    })
    .pipe(          // Storing the token
      tap((response: AuthResponseLogin) => {
        this.token = response.idToken; 
        this.token_available.emit();
      })
    );
  }

  login(email:string,password:string){
    return this.http.post<AuthResponseLogin>("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAve9yJolUkU8hN9zmEI0A_UOJu-b9vkFE",{
      'email':email,
      'password':password,
      'returnSecureToken':true
    })
    .pipe(          // Storing the token
      tap((response: AuthResponseLogin) => {
        this.token = response.idToken; 
        this.token_available.emit();
      })
    );
  }

  getToken(){
    return this.token;
  }

}
