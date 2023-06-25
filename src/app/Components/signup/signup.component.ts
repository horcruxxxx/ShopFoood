import { Component } from '@angular/core';
import {FormGroup,FormControl,Validators}  from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { RecipeService } from 'src/app/Services/recipe-service.service';
import { UserModel } from 'src/app/User.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  SignupForm :FormGroup;
  loading:boolean = false;
  errorMessage:string = null;

  constructor(
    private route:Router,
    private Authservice:AuthService,
    private recipeservice:RecipeService
  ){}

  ngOnInit(){
    this.SignupForm = new FormGroup({
      'username':  new FormControl(null,Validators.required),
      'email': new FormControl(null,[Validators.required,Validators.email]),
      'password':new FormControl(null,Validators.required),
      'dropdownURL':new FormControl(null,Validators.required)
    })
  }

  onSubmit(){
    this.errorMessage = null;

    //base case
    if(this.SignupForm.invalid){ 
      return;
    }

    // Collecting Form Info.
    this.loading = true;
    const username = this.SignupForm.get('username').value;
    const homeStateUrl = this.SignupForm.get('dropdownURL').value;
    const password = this.SignupForm.get('password').value;
    const email = this.SignupForm.get('email').value;

    //adding a new user to the database.
    const newuser = new UserModel(email,username,homeStateUrl);
    this.recipeservice.Users_Array = [];
    this.recipeservice.addUser(newuser);

    // making http Request
    this.Authservice.signUp(email,password).subscribe(Response=>{
      console.log(Response);
      this.loading = false;
      this.SignupForm.reset();
      this.route.navigate(['/login']);
    },errorRes=>{
      this.errorMessage = errorRes.error.error.message;
      if(this.errorMessage==null) this.errorMessage = "uncaught error occured. Try after sometime"; //edge case
      this.loading=false;
    })
  }

  onClickLogin(){
    this.route.navigate(['/login']);
  }

}
