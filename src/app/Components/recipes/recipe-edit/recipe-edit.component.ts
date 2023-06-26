import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/Services/recipe-service.service';
import { Router } from '@angular/router';
import { FormDataService } from 'src/app/Services/form-data.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit{

  recipeEditForm :FormGroup;

  constructor(private recipeservice:RecipeService,private route:Router,private formdataservice:FormDataService){}

  ngOnInit(){
    const name = this.formdataservice.previousData_Recipe.recipeName;
    const category = this.formdataservice.previousData_Recipe.recipeCategory;
    const desc = this.formdataservice.previousData_Recipe.recipeDescription;
    const url = this.formdataservice.previousData_Recipe.recipeURL;

    this.recipeEditForm = new FormGroup({
      'name': new FormControl(name,Validators.required),
      'category': new FormControl(category,Validators.required),
      'desc':new FormControl(desc,Validators.required),
      'url': new FormControl(url,Validators.required)
    })
  }

  onSubmit(){

    const updatedRecipe: Recipe = {
      ...this.formdataservice.previousData_Recipe,
      recipeName: this.recipeEditForm.get('name').value,
      recipeCategory: this.recipeEditForm.get('category').value.toLowerCase(),
      recipeDescription: this.recipeEditForm.get('desc').value,
      recipeURL: this.recipeEditForm.get('url').value
    };
  
    this.recipeservice.updateRecipe(updatedRecipe);
    this.recipeEditForm.reset();
    this.route.navigate(['/recipes']);
    setTimeout(() => {
      alert("Recipe Updated!, Dont forgot to save recipe via Manage Dropdown!");
    }, 1000);

  }
  onCancel(){
    this.route.navigate(['/recipes']);
  }
}
