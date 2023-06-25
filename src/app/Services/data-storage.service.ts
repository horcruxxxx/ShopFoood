import { Injectable} from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { RecipeService } from './recipe-service.service';
import { Recipe } from '../Components/recipes/recipe.model';
import { AuthService } from './auth.service';
import { UserModel } from '../User.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DataStorageService{

  constructor(
    private http:HttpClient,
    private recipeservice:RecipeService,
    private authservice:AuthService
  ) { }

  storeRcipes(){
    const Recipes:Recipe[] = this.recipeservice.Recipes_Array.slice();
    const token = this.authservice.getToken();
    const queryParams = token ? `?auth=${token}` : '';  //edge case when there is no query params.
    console.log("token to hai (recipe store) = " + token);
    this.http.put(`https://shopfood2-default-rtdb.firebaseio.com/recipes.json${queryParams}`,Recipes).subscribe();
  }

  fetchRecipes(){
    const token = this.authservice.getToken();
    const queryParams = token ? `?auth=${token}` : '';  //edge case when there is no query params.
    this.http.get<Recipe[]>(`https://shopfood2-default-rtdb.firebaseio.com/recipes.json${queryParams}`).subscribe(Response=>{
      this.recipeservice.setRecipes(Response);
    });
  }

  storeUserData(users:UserModel[]){
    const token = this.authservice.getToken();
    const queryParams = token ? `?auth=${token}` : '';  //edge case when there is no query params.
    this.http.put(`https://shopfood2-default-rtdb.firebaseio.com/userdata.json${queryParams}`,users).subscribe();
  }

  fetchUserByEmail(email:string){
    const token = this.authservice.getToken();
    const queryParams = token ? `?auth=${token}` : '';  //edge case when there is no query params.
    return this.http.get<UserModel[]>(`https://shopfood2-default-rtdb.firebaseio.com/userdata.json${queryParams}`).pipe(
      map(users => {
        for (const userKey in users) {
          const userData = users[userKey];
          if (userData.email === email) {
            return new UserModel(userData.email, userData.username, userData.homeStateURL);
          }
        }
      })
    );
  }

  fetchAllUsers(){
    const token = this.authservice.getToken();
    const queryParams = token ? `?auth=${token}` : '';  //edge case when there is no query params.
    return this.http.get<UserModel[]>(`https://shopfood2-default-rtdb.firebaseio.com/userdata.json${queryParams}`).subscribe(Response=>{
      this.recipeservice.setUsers(Response);
    });
  } 
}
