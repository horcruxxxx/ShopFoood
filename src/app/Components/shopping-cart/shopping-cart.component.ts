import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/Services/recipe-service.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit{
  ShoppingCart:string[];
 
  constructor(private recipeservice:RecipeService){}

  ngOnInit(): void {
    this.recipeservice.CartChanged.subscribe(()=>{
      this.ShoppingCart = this.recipeservice.CartItemsList.slice();
    })
    this.ShoppingCart = this.recipeservice.CartItemsList.slice();
  }

  onClick(index:number){
    this.recipeservice.deleteCartItem(index);
  }
  
}
