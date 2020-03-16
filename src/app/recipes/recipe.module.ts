import { RecipeRoutingModule } from './recipes-router.module';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes.component';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';

@NgModule({
    declarations: [
        RecipeListComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        RecipeListComponent,
        RecipesComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeEditComponent
    ],
    imports: [
        ReactiveFormsModule,
        RecipeRoutingModule

    ],
    exports: [
        RecipeListComponent,
        RecipeStartComponent,
        RecipeEditComponent,
        RecipeListComponent,
        RecipesComponent,
        RecipeDetailComponent,
        RecipeItemComponent,
        RecipeEditComponent
    ]
})
export class RecipeModule { }