import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/Services/recipe-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormDataService } from 'src/app/Services/form-data.service';

@Component({
  selector: 'app-recipe-card',
  templateUrl: './recipe-card.component.html',
  styleUrls: ['./recipe-card.component.css'],
  
})
export class RecipeCardComponent implements OnInit{
  recipeList:Recipe[];
  @Input() currentRecipe:Recipe;
  @Input() CurrIndex:number;
  @Input() CurrentRecipeID:string;

  constructor(
    private recipeservice:RecipeService,
    private route:Router,
    private currentroute:ActivatedRoute,
    private formdataservice:FormDataService
    ){}

  ngOnInit(){
    this.recipeList = this.recipeservice.Recipes_Array;
  }

  addtocart(name:string){
    this.recipeservice.addCartItem(name);
  }

  onCLickdeleteRecipe(){
    this.recipeservice.deleteRecipe(this.CurrentRecipeID);
    setTimeout(() => {
      alert("Recipe Deleted!, Dont forgot to save recipe via Manage Dropdown!");
    }, 1000);
  }

  onClickEdit(){
    this.formdataservice.set_IndexOfPreviousRecipe(this.CurrIndex);
    this.formdataservice.set_previousData_Recipe(this.currentRecipe);
    this.formdataservice.set_CurrentRecipeID(this.CurrentRecipeID);
    this.route.navigate(['edit'],{relativeTo:this.currentroute});
  }

}
