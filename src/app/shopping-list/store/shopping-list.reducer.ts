import { Ingredient } from '../../shared/ingredient.model';
import { Action } from '@ngrx/store';
import * as ShoppingListActions from './shopping-list.action';



export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIdx: number;
}

const initialState: State = {
    ingredients: [new Ingredient("Apples", 5), new Ingredient("Tomatoes", 10)],
    editedIngredient: null,
    editedIngredientIdx: -1

}

export function shoppingListReducer(state: State = initialState, action: ShoppingListActions.ShoppingListActions) {

    switch (action.type) {
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: [...state.ingredients, action.payload]
            }
        case ShoppingListActions.ADD_INGREDIENTS:
            return {
                ...state,
                ingredients: [...state.ingredients, ...action.payload]
            }

        case ShoppingListActions.UPDATE_INGREDIENT:
            const updatedIngredients = [...state.ingredients];
            // updatedIngredients.splice(action.payload.index, 1, action.payload);
            return {
                ...state,
                ingredients: updatedIngredients,
                editedIngredient: null,
                editedIngredientIdx: -1
            };
        case ShoppingListActions.DELETE_INGREDIENT:
            return {
                ...state,
                ingredients: state.ingredients.filter(
                    (ingredient, idx) => idx !== action.payload
                ),
                editedIngredient: null,
                editedIngredientIdx: -1
            };

        case ShoppingListActions.START_EDIT:
            return {
                ...state,
                editedIngredientIdx: action.payload,
                editedIngredient: { ...state.ingredients[action.payload] }
            };
        case ShoppingListActions.STOP_EDIT:
            return {
                ...state,
                editedIngredient: null,
                editedIngredientIdx: -1
            };

        default:
            return state;
    }
}