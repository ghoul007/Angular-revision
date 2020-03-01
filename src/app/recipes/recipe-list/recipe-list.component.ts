import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  @Output() recipeWasSelected = new EventEmitter<Recipe>();

  
  recipes: Recipe[] = [
    new Recipe('A test recipe', 'This is a test recipe',
      'http://recettes-de-chefs.ca/images/archives/les_recettes_david_biron/main/00_Beauty_Shot_Cotelettes-large.jpg'),
    new Recipe('Another test recipe', 'This is a test recipe',
      'http://recettes-de-chefs.ca/images/archives/les_recettes_david_biron/main/00_Beauty_Shot_Cotelettes-large.jpg')
  ];


  constructor() { }

  ngOnInit(): void {
  }

  onRecipeSelected(recipe: Recipe) {
    console.log("On recipe selected");
    this.recipeWasSelected.emit(recipe);
  }
}
