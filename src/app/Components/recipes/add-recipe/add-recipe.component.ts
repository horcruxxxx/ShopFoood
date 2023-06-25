import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/Services/recipe-service.service';
import { Recipe } from '../recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent implements OnInit {
  AddRecipe:FormGroup;


  constructor(private recipeservice:RecipeService,private route:Router){}

  ngOnInit(): void {
    this.AddRecipe = new FormGroup({
      'name': new FormControl(null,Validators.required),
      'category': new FormControl(null,Validators.required),
      'desc':new FormControl(null,Validators.required),
      'url': new FormControl(null,Validators.required)
    })
  }

  onSubmit(){
    const newItem:Recipe = new Recipe(
      this.AddRecipe.get('name').value,
      this.AddRecipe.get('category').value,
      this.AddRecipe.get('desc').value,
      this.AddRecipe.get('url').value
    );
    
    this.recipeservice.addRecipe(newItem);
    this.AddRecipe.reset();
    this.route.navigate(['/recipes']);
  }

  onCancel(){
    this.route.navigate(['/recipes']);
  }

}
