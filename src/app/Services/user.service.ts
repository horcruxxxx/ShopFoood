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
  currentUser:UserModel;
  CurrentEmail:string;
  email_available = new EventEmitter<null>();

  userDataChanged = new EventEmitter<null>();

  constructor(
    private datastorageservice:DataStorageService,
    private authservice:AuthService,
    private recipeservice:RecipeService
  ) {

    //WAITING FOR 2 EVENTS TO HAPPEN ONLY AFTER THAT WE WILL EXECUTE THIS FOR PREPOPULATIN THE VALUES OF USER IN THE "MY PROFILE" COMPONENT. 
    combineLatest([this.authservice.token_available_login, this.email_available]).subscribe(() => {
      this.datastorageservice.fetchUserByEmail(this.CurrentEmail).subscribe((user:UserModel)=>{
        this.setUserData(user.username,user.homeStateURL);
        this.currentUser = user;
      })
    });

    // FOR FETCHING ALL REGISTERED USERS when signin.
    this.authservice.token_available_signup.subscribe(()=>{
      this.datastorageservice.fetchAllUsers();
    });

    // FOR FETCHING ALL REGISTERED USERS when login.
    this.authservice.token_available_login.subscribe(()=>{
      this.recipeservice.Users_Array=[];
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

  UpdateUserData(currentUser:UserModel){
      const userIndex = this.recipeservice.Users_Array.findIndex(user => user.email === currentUser.email);
      this.recipeservice.Users_Array.splice(userIndex,1,currentUser);
      this.datastorageservice.storeUserData(this.recipeservice.Users_Array);
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
