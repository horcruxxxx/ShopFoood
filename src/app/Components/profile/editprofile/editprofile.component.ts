import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { UserModel } from 'src/app/User.model';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit{
    profileForm:FormGroup;
    username:string = 'empty';
    homeStateUrl:string = 'empty';
    constructor(
      private route:Router
      ,private userservice:UserService
    ){}

    ngOnInit(){
      this.userservice.userDataChanged.subscribe(()=>{
        this.username = this.userservice.users_Username;
        this.homeStateUrl = this.userservice.users_homeStateUrl;
      })
      this.username = this.userservice.getuserData_username();
      this.homeStateUrl = this.userservice.getuserdata_homeStateUrl();
      this.profileForm = new FormGroup({
        'username': new FormControl(this.username,Validators.required),
        'homeStateUrl':new FormControl(this.homeStateUrl,Validators.required)
      })
    }
    
    onSubmit(){
      this.username =  this.profileForm.get('username').value;
      this.homeStateUrl = this.profileForm.get('homeStateUrl').value;

      const updatedUser: UserModel = {
        ...this.userservice.currentUser,
        username :  this.username,
        homeStateURL : this.homeStateUrl
      };
      this.userservice.setUserData(this.username,this.homeStateUrl);
      this.userservice.UpdateUserData(updatedUser);
      
      this.route.navigate(['/profile']);
    }

    onCancel(){
      this.route.navigate(['/profile']);
    }

}
