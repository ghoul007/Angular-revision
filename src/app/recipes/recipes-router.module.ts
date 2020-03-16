import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes.component';
import { NgModule } from '@angular/core';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RouterModule, Routes } from '@angular/router';
import { RecipeResolverService } from './recipes-resolver.service';
import { AuthGaurd } from '../auth/auth.guard';

const recipeRoute: Routes = [
    {
              path: 'recipes', canActivate: [AuthGaurd], component: RecipesComponent, children: [
            { path: '', component: RecipeStartComponent },
            { path: 'new', component: RecipeEditComponent },
            { path: ':id', component: RecipeDetailComponent, resolve: [RecipeResolverService] },
            { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipeResolverService] },
        ]
    }]

@NgModule({
    imports: [RouterModule.forChild(recipeRoute)],
    exports: [RouterModule]
})

export class RecipeRoutingModule {}