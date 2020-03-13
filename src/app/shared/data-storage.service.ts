import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { tap, take, exhaustMap } from 'rxjs/operators'
import { AuthServise } from '../auth/auth.Service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthServise) { }

  storeRecipes() {
    return this.http.put(
      'https://angular-revision.firebaseio.com/recipes.json',
      this.recipeService.getRecipes()
    );
  }


  getRecipes() {

    this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http
        .get(
          'https://ng-recipe-book-29ea3.firebaseio.com/recipes.json', { params: new HttpParams().set('auth', user.token) }
        )
    }),
      tap((recipes: Recipe[]) => {
        this.recipeService.setRecipes(recipes);//After recipes are recieved set recipes object
      }));



  }
}


