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
    Orignal_Recipes_Array:Recipe[];
    filteredRecipes: Recipe[]; // Filtered recipes
    searchText: string; // Search text entered by user
    loading:boolean = true;
    searching:boolean = false;

    constructor(
      private recipeservice:RecipeService,
      private route:Router,
      private currentRoute:ActivatedRoute,
      private datastorageService:DataStorageService
    ){}

    ngOnInit() {
      this.loading = true;
      this.groupRecipesByCategory();
      this.Orignal_Recipes_Array = this.recipeservice.Recipes_Array.slice();
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
      this.Orignal_Recipes_Array = this.recipeservice.Recipes_Array.slice();
      const recipes = this.recipeservice.Recipes_Array.slice();
      const categories = [...new Set(recipes.map(recipe => recipe.recipeCategory))];
      this.Recipes_Array = categories.map(category => {
        return {
          category,
          recipes: recipes.filter(recipe => recipe.recipeCategory === category)
        };
      });
    }
    
    search(){
      this.searching = true;
      this.filteredRecipes = this.Orignal_Recipes_Array.filter(recipe =>
        recipe.recipeName.includes(this.searchText) || recipe.recipeCategory.includes(this.searchText)
      );
    }
    reset(){
      this.searching = false;
      this.searchText = "";
    }

    onClickAdd(){
      this.route.navigate(['add'],{relativeTo:this.currentRoute});
    }
}
