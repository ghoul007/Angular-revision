import * as  RecipeActions from './recipe.actions';
import { Recipe } from './../recipe.model';


export interface State {
    recipes: Recipe[]
}


const intitalState {
    recipes: []
}


export function recipeReducer(state: State = intitalState, action: RecipeActions.RecipeActions) {

    switch (action.type) {
        case RecipeActions.SET_RECIPES:
            return {
                ...state,
                recoipes: [...action.payload]
            }

        default:
            return state;
    }
}