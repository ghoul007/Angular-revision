import { map, tap } from 'rxjs/internal/operators';
import { Store } from '@ngrx/store';
import { RecipeService } from './../recipe.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { Router, ActivatedRoute } from '@angular/router';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {


  recipes: Recipe[];




  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>) { }


  ngOnInit(): void {
    this.store.select('recipes')
      .pipe(
        map(recipesState => recipesState.recipes),
      ).subscribe(
        recipes => this.recipes = recipes
      );
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }


}
