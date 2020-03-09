import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    return this.http.put(
      'https://angular-revision.firebaseio.com/recipes.json',
      this.recipeService.getRecipes()
    );
  }


  getRecipes() {
    return this.http
      .get(
        'https://ng-recipe-book-29ea3.firebaseio.com/recipes.json'
      )
      // .pipe(
      //   map((response: Response) => {
      //     const recipes: Recipe[] = response.json();
      //     for (let recipe of recipes) {
      //       if (!recipe['ingredients']) {
      //         recipe['ingredients'] = [];
      //         console.log(recipe);
      //       }
      //     }
      //     return recipes;
      //   })
      // )
      .pipe(tap((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);//After recipes are recieved set recipes object
      }));
  }
}


