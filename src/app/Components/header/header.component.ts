import { Component, OnInit } from '@angular/core';
import { DataStorageService } from 'src/app/Services/data-storage.service';
import { RecipeService } from 'src/app/Services/recipe-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  cartItemCount:number = 0;

  constructor(private datastorageService:DataStorageService,private recipeservice:RecipeService){
    this.cartItemCount = this.recipeservice.CartItemsList.length;
  }

  ngOnInit(){
    this.recipeservice.CartChanged.subscribe(()=>{
      this.cartItemCount = this.recipeservice.CartItemsList.length;
    })
  }

  onClickSave(){
    this.datastorageService.storeRcipes();
  }
}
