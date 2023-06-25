import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppRouting } from './Routing.module';
import { RecipesComponent } from './Components/recipes/recipes.component';
import { RecipeCardComponent } from './Components/recipes/recipe-card/recipe-card.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { DropDownDirective } from './Directives/DropDown.directive';
import { AddRecipeComponent } from './Components/recipes/add-recipe/add-recipe.component';
import { EditprofileComponent } from './Components/profile/editprofile/editprofile.component';
import {HttpClientModule} from '@angular/common/http';
import { LoadingSpinnerComponent } from './Components/Shared/loading-spinner/loading-spinner.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { RecipeEditComponent } from './Components/recipes/recipe-edit/recipe-edit.component';
import { HeaderComponent } from './Components/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    RecipesComponent,
    RecipeCardComponent,
    ProfileComponent,
    HeaderComponent,
    DropDownDirective,
    AddRecipeComponent,
    EditprofileComponent,
    LoadingSpinnerComponent,
    ShoppingCartComponent,
    RecipeEditComponent,
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,RouterLink,AppRouting,HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
