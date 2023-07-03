import { NgModule } from '@angular/core';
import { RouterModule,Routes } from '@angular/router';
import { AddRecipeComponent } from '../Components/recipes/add-recipe/add-recipe.component';
import { RecipesComponent } from '../Components/recipes/recipes.component';
import { RecipeEditComponent } from '../Components/recipes/recipe-edit/recipe-edit.component';

const appRoutes:Routes = [
    {path:'',component:RecipesComponent,children:[
        {path:'add',component:AddRecipeComponent},
        {path:'edit',component:RecipeEditComponent}
    ]}
]

@NgModule({
    imports:[
        RouterModule.forChild(appRoutes)
    ],
    exports:[RouterModule]
})

export class RecipeRoutingModule{

}