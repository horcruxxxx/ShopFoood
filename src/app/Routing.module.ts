import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { SignupComponent } from './Components/signup/signup.component';
import { LoginComponent } from './Components/login/login.component';
import { RecipesComponent } from './Components/recipes/recipes.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { AddRecipeComponent } from './Components/recipes/add-recipe/add-recipe.component';
import { EditprofileComponent } from './Components/profile/editprofile/editprofile.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';
import { RecipeEditComponent } from './Components/recipes/recipe-edit/recipe-edit.component';

const appRoutes:Routes = [
    {path:'',component:LoginComponent,pathMatch:'full'},
    {path:'signup',component:SignupComponent},
    {path:'login',component:LoginComponent},
    {path:'recipes',component:RecipesComponent,children:[
        {path:'add',component:AddRecipeComponent},
        {path:'edit',component:RecipeEditComponent}
    ]},
    {path:'profile',component:ProfileComponent,children:[
        {path:'edit',component:EditprofileComponent}
    ]},
    {path:'cart',component:ShoppingCartComponent},
    {path:'**',redirectTo:'/login'}
]

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes)
    ],
    exports:[RouterModule]
})

export class AppRouting{

}