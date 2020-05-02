import { Actions, ofType } from '@ngrx/effects';
import * as RecipeActions  from './store/recipe.actions';
import { Store } from '@ngrx/store';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { Observable, of } from "rxjs";
import { RecipeService } from "./recipe.service";
import { AppState } from '../store/app.reducer';
import { take, map, switchMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RecipeResolverService implements Resolve<Recipe[]>{
  dataStorageService: DataStorageService;
  recipeService: RecipeService;

  constructor(dataStorageService: DataStorageService,
    private store: Store<AppState>,
    private actions$: Actions,
    recipeService: RecipeService) {
    this.dataStorageService = dataStorageService;
    this.recipeService = recipeService;
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    // const recipes = this.recipeService.getRecipes();
    // if (recipes.length === 0) {
    //   return this.recipeService.getRecipes();
    // } else {
    //   return recipes;
    // }

    return this.store.select("recipes").pipe(
      take(1),
      map(recipesState => recipesState.recipes),
      switchMap(recipes => {
        if (!recipes.length) {
          this.store.dispatch(new RecipeActions.FetchRcipes());
          return this.actions$.pipe(
            ofType(RecipeActions.SET_RECIPES),
            take(1)
          );
        } else {
          return of(recipes);
        }
      })
    );



  }
}
