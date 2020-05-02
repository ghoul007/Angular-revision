import { FETCH_RECIPES } from './recipe.actions';
import { Recipe } from './../recipe.model';
import { Action } from '@ngrx/store';


export const SET_RECIPES = "[Recipe] Set Recipes";
export const FETCH_RECIPES = "[Recipe] Fetch Recipes";
export const STORE_RECIPES = "[Recipe] Store Recipes";
export const ADD_RECIPE = "[Recipe] Add Recipe";
export const UPDATE_RECIPE = "[Recipe] Update Recipe";
export const DELETE_RECIPE = "[Recipe] Delete Recipe";


export class SetRecipes implements Action {
    readonly type = SET_RECIPES:
    constructor(public payload: Recipe[]) { }
}

export class FetchRcipes implements Action {
    readonly type = FETCH_RECIPES:
}


export type RecipeActions = SetRecipes;