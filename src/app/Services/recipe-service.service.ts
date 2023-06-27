import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../Components/recipes/recipe.model';
import { FormDataService } from './form-data.service';
import { UserModel } from '../User.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private formdataservice: FormDataService) {
  }

  RecipeChanged = new EventEmitter<null>();
  CartChanged = new EventEmitter<null>();
  UsersFetched = new EventEmitter<null>();

  Recipes_Array:Recipe[]  =[];
  Users_Array:UserModel[] =[];
  CartItemsList:string[]  =[];

  addRecipe(newRecipe:Recipe){
    this.Recipes_Array = this.Recipes_Array || [];
    console.log("one");
    this.Recipes_Array.push(newRecipe);
    console.log("two");
    this.RecipeChanged.emit();
  }

  deleteRecipe(id:string){
    const recipeIndex = this.Recipes_Array.findIndex(recipe => recipe.recipeID === id);
    this.Recipes_Array.splice(recipeIndex,1);
    this.RecipeChanged.emit();
  }

  updateRecipe(changedRecipe:Recipe){
    const recipeIndex = this.Recipes_Array.findIndex(recipe => recipe.recipeID === changedRecipe.recipeID);
    this.Recipes_Array.splice(recipeIndex,1,changedRecipe);

    this.RecipeChanged.emit();
  }

  setRecipes(UpdatedRecipes:Recipe[]){
    this.Recipes_Array = UpdatedRecipes;
    this.RecipeChanged.emit();
  }

  addUser(newUser:UserModel){
    this.Users_Array = [];
    this.Users_Array.push(newUser);
  }

  setUsers(UpdatedUsers:UserModel[]){
    this.Users_Array.push(...UpdatedUsers) ;
    this.UsersFetched.emit();
  }

  addCartItem(name:string){
    this.CartItemsList.push(name);
    this.CartChanged.emit();
  }

  deleteCartItem(index:number){
    this.CartItemsList.splice(index,1);
    this.CartChanged.emit();
  }

}
