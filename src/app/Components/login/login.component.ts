import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { DataStorageService } from 'src/app/Services/data-storage.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  LoginForm :FormGroup;
  loading:boolean = false;
  errorMessage:string = null;
  homestateURL:string='/recipes';

  constructor(
    private route:Router,
    private authservice:AuthService,
    private userservice:UserService,
    private datastorageservice:DataStorageService
  ){}

  ngOnInit(){
    this.LoginForm = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'password':new FormControl(null,Validators.required)
    })
    
    this.userservice.userDataChanged.subscribe(()=>{
      this.homestateURL = this.userservice.users_homeStateUrl;
    })
    this.homestateURL = this.userservice.getuserdata_homeStateUrl();
  }

  async onSubmit() {
    // Base case
    if (this.LoginForm.invalid) {
      return;
    }
  
    // Collecting Form Info.
    this.loading = true;
    const email = this.LoginForm.get('email').value;
    const password = this.LoginForm.get('password').value;
  
    // Storing the email of the currently logged-in user.
    this.userservice.setEmail(email);
  
    try {
      
      // Making the HTTP request and fetching the user data
      await this.authservice.login(email, password).toPromise();
      const user = await this.datastorageservice.fetchUserByEmail(email).toPromise();

      // Setting the user data and fetching the home state URL
      this.userservice.setUserData(user.username, user.homeStateURL);
      const homeStateURL = this.userservice.getuserdata_homeStateUrl();

      // Resetting the form and redirecting to the home state URL
      this.loading = false;
      this.LoginForm.reset();
      this.route.navigate(['/' + homeStateURL]);
    } catch (error) {
      this.errorMessage = (error) ? "incorrect Password or Email" : "Uncaught Error Occured. Try after sometime";
      this.loading = false;
    }
  }
  

  onClickSignUp(){
    this.route.navigate(['/signup']);
  }

}
