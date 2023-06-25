import { Component, EventEmitter, OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from 'src/app/Services/recipe-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DataStorageService } from 'src/app/Services/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

    Recipes_Array: { category: string, recipes: Recipe[] }[];
    loading:boolean = true;

    constructor(
      private recipeservice:RecipeService,
      private route:Router,
      private currentRoute:ActivatedRoute,
      private datastorageService:DataStorageService
    ){}

    ngOnInit() {
      this.loading = true;
      this.groupRecipesByCategory();
      this.recipeservice.RecipeChanged.subscribe(() => {
        if (this.recipeservice.Recipes_Array) {
          this.groupRecipesByCategory();
        }
      });
      this.datastorageService.fetchRecipes();
      this.loading = false;
      if (this.recipeservice.Recipes_Array) {
        this.groupRecipesByCategory();
      }
    }
    
    groupRecipesByCategory() {
      const recipes = this.recipeservice.Recipes_Array.slice();
      const categories = [...new Set(recipes.map(recipe => recipe.recipeCategory))];
      this.Recipes_Array = categories.map(category => {
        return {
          category,
          recipes: recipes.filter(recipe => recipe.recipeCategory === category)
        };
      });
      for(let i =0;i<this.Recipes_Array.length;i++){
        console.log(this.Recipes_Array[i]);
      }
    }
  
    onClickAdd(){
      this.route.navigate(['add'],{relativeTo:this.currentRoute});
    }
}
