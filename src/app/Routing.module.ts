import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule,Routes } from '@angular/router';
import { SignupComponent } from './Components/signup/signup.component';
import { LoginComponent } from './Components/login/login.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { EditprofileComponent } from './Components/profile/editprofile/editprofile.component';
import { ShoppingCartComponent } from './Components/shopping-cart/shopping-cart.component';

const appRoutes:Routes = [
    {path:'',component:LoginComponent,pathMatch:'full'},
    {path:'signup',component:SignupComponent},
    {path:'login',component:LoginComponent},

    {path: 'recipes',loadChildren: () => import('./RecipeModule/Recipes.module').then(m => m.RecipesModule)},

    {path:'profile',component:ProfileComponent,children:[
        {path:'edit',component:EditprofileComponent}
    ]},
    {path:'cart',component:ShoppingCartComponent},
    {path:'**',redirectTo:'/login'}
]

@NgModule({
    imports:[
        RouterModule.forRoot(appRoutes,{preloadingStrategy:PreloadAllModules})
    ],
    exports:[RouterModule]
})

export class AppRouting{

}