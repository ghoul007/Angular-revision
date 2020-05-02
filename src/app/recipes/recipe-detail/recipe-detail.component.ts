import { map } from 'rxjs/internal/operators';
import { Store } from '@ngrx/store';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;
  id: number;
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = + params['id'];
        this.store
          .select('recipes')
          .pipe(map(data => data.recipes.find(e => e.id === this.id)))
          .subscribe(recipe => {
            this.recipe = recipe
          })
        // this.recipe = this.recipeService.getRecipe(this.id);
      }
    );

  }


  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }


  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    //this.router.navigate(['../',this.id,'edit'],{relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);

  }
}
