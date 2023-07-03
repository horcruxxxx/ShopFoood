import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeEditComponent } from '../Components/recipes/recipe-edit/recipe-edit.component';
import { AddRecipeComponent } from '../Components/recipes/add-recipe/add-recipe.component';
import { RecipeCardComponent } from '../Components/recipes/recipe-card/recipe-card.component';
import { RecipesComponent } from '../Components/recipes/recipes.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { RecipeRoutingModule } from './recipes-routing.module';


@NgModule({
  declarations: [
    RecipesComponent,
    RecipeCardComponent,
    AddRecipeComponent,
    RecipeEditComponent
  ],
  exports:[
    RouterModule,  //beacuse forROOT only used for once.
    RecipesComponent,
    RecipeCardComponent,
    AddRecipeComponent,
    RecipeEditComponent
  ],
  imports: [
    CommonModule,ReactiveFormsModule,FormsModule,RecipeRoutingModule
  ]
})
export class RecipesModule { }
