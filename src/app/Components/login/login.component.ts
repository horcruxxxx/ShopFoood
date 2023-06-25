import { Component, OnInit } from '@angular/core';
import {FormGroup,FormControl,Validators} from '@angular/forms'
import { Router  } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
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

  constructor(
    private route:Router,
    private authservice:AuthService,
    private userservice:UserService,
  ){}

  ngOnInit(){
    this.LoginForm = new FormGroup({
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'password':new FormControl(null,Validators.required)
    })
  }

  onSubmit(){
    //base - case
    if(this.LoginForm.invalid) {
      return; 
    }

    //collecting Form Info.
    this.loading = true;
    const email = this.LoginForm.get('email').value;
    const passsword = this.LoginForm.get('password').value;

    //storing the email of currently logged-in user.
    this.userservice.setEmail(email);

    //making http request
    this.authservice.login(email,passsword).subscribe(Response=>{
      console.log(Response);
      this.loading = false;
      this.LoginForm.reset();
      this.route.navigate(['/recipes'])
    },errorRes=>{
      console.log(errorRes);
      this.errorMessage = errorRes.error.error.message;
      if(this.errorMessage==null) this.errorMessage = "Uncaught Error Occured. Try after sometime"; //Edge Case
      this.loading = false; 
    });

  }

  onClickSignUp(){
    this.route.navigate(['/signup']);
  }

}
