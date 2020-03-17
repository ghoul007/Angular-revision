import { LoggingService } from './../logging.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private igChangeSub: Subscription;

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10)
  ];

  constructor(private slService: ShoppingListService,  private loggingService: LoggingService) { }

  ngOnInit() {
    this.loggingService.printLog('hello from  shoppinglist component ngOninit')
    this.ingredients = this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }


  onEditItem(index: number){
    this.slService.startedEditing.next(index);
  }

    ngOnDestroy(): void{
    this.igChangeSub.unsubscribe();
  }

}
