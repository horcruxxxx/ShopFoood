import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  username:string='empty';
  homestateURL:string='empty';
  constructor(
    private route:Router,
    private currentRoute:ActivatedRoute,
    private userservice:UserService
  ){}

  ngOnInit(){
    this.userservice.userDataChanged.subscribe(()=>{
      this.username = this.userservice.users_Username;
      this.homestateURL = this.userservice.users_homeStateUrl;
    })
    this.username = this.userservice.getuserData_username();
    this.homestateURL = this.userservice.getuserdata_homeStateUrl();
  }

  onClick(){
    this.route.navigate(['edit'],{relativeTo:this.currentRoute});
  }
}
