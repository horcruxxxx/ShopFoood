import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppRouting } from './Routing.module';

import { ProfileComponent } from './Components/profile/profile.component';
import { DropDownDirective } from './Directives/DropDown.directive';
import { EditprofileComponent } from './Components/profile/editprofile/editprofile.component';
import {HttpClientModule} from '@angular/common/http';
import { LoadingSpinnerComponent } from './Components/Shared/loading-spinner/loading-spinner.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { HeaderComponent } from './Components/header/header.component';
import { FormsModule } from '@angular/forms';
import { RecipesModule } from './RecipeModule/Recipes.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ProfileComponent,
    HeaderComponent,
    DropDownDirective,
    EditprofileComponent,
    LoadingSpinnerComponent,
    ShoppingCartComponent,
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,RouterLink,HttpClientModule,FormsModule,RecipesModule,AppRouting
    //EK SE ZADA MODULE KE ROUTE USE HO RAHE HAI JOKI BAAD ME MERGE HONHGE TO JISME  WILDCARD ROUTE HAI VO LAST ME IMPORT KARNA HOTA HAI! 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
