import { EventEmitter, Injectable } from '@angular/core';
import { UserModel } from '../User.model';
import { DataStorageService } from './data-storage.service';
import { AuthService } from './auth.service';
import { combineLatest } from 'rxjs';
import { RecipeService } from './recipe-service.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userData:UserModel[]=[];
  users_Username:string='empty';
  users_homeStateUrl:string = 'empty';
  CurrentEmail:string;
  email_available = new EventEmitter<null>();

  userDataChanged = new EventEmitter<null>();

  constructor(
    private datastorageservice:DataStorageService,
    private authservice:AuthService,
    private recipeservice:RecipeService
  ) {

    //WAITING FOR 2 EVENTS TO HAPPEN ONLY AFTER THAT WE WILL EXECUTE THIS FOR PREPOPULATIN THE VALUES OF USER IN THE "MY PROFILE" COMPONENT. 
    combineLatest([this.authservice.token_available, this.email_available]).subscribe(() => {
      this.datastorageservice.fetchUserByEmail(this.CurrentEmail).subscribe((user:UserModel)=>{
        this.setUserData(user.username,user.homeStateURL);
      })
    });

    // FOR FETCHING ALL REGISTERED USERS.
    this.authservice.token_available.subscribe(()=>{
      this.datastorageservice.fetchAllUsers();
    });

    //storing new user to database with exsisting users.
    this.recipeservice.UsersFetched.subscribe(()=>{
      this.datastorageservice.storeUserData(this.recipeservice.Users_Array);
    })

  }

  setEmail(email:string){
    this.CurrentEmail = email;
    this.email_available.emit();
  }

  setUserData(currentUsername:string,currentHomeStateUrl:string){
    this.users_Username = currentUsername;
    this.users_homeStateUrl = currentHomeStateUrl;
    this.userDataChanged.emit();
  }

  get_userData(){
    return this.userData.slice();
  }
  getuserData_username(){
    return this.users_Username;
  }
  getuserdata_homeStateUrl(){
    return this.users_homeStateUrl;
  }

}