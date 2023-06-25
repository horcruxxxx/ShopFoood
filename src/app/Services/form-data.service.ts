import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Recipe } from '../Components/recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class FormDataService {

  previousData_Recipe_change = new EventEmitter<Recipe>();
  IndexOfPreviousRecipe_change = new EventEmitter<number>();
  PreviousData_Profile_change = new EventEmitter<FormGroup>();
  CurrentRecipeID_change = new EventEmitter<string>();

  PreviousData_Profile:FormGroup;
  previousData_Recipe:Recipe;
  IndexOfPreviousRecipe:number;
  CurrentRecipeID:string;

  constructor() { 
    this.PreviousData_Profile = new FormGroup({});
  }

  set_previousData_Recipe(recipe:Recipe){
    this.previousData_Recipe = recipe;
    this.previousData_Recipe_change.emit(recipe);
  }

  set_IndexOfPreviousRecipe(index:number){
    this.IndexOfPreviousRecipe = index;
    this.IndexOfPreviousRecipe_change.emit(index);
  }

  set_CurrentRecipeID(id:string){
    this.CurrentRecipeID = id;
    this.CurrentRecipeID_change.emit(id);
  }

  set_PreviousData_Profile(form:FormGroup){
    this.PreviousData_Profile = form;
    this.PreviousData_Profile_change.emit(form);
  }

}
