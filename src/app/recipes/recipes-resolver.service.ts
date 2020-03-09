import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Recipe } from "./recipe.model";
import { Injectable } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { Observable } from "rxjs";
import { RecipeService } from "./recipe.service";

@Injectable({ providedIn: 'root'})
export class RecipeResolverService implements Resolve<Recipe[]>{
    dataStorageService:DataStorageService;
    recipeService:RecipeService;

    constructor(dataStorageService:DataStorageService,recipeService:RecipeService){
        this.dataStorageService=dataStorageService;
        this.recipeService=recipeService;
    }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Recipe[] | Observable<Recipe[]> | Promise<Recipe[]> {
        console.log("resolver called");
        const recipes=this.recipeService.getRecipes();
        if(recipes.length>0){
            return recipes;
        }
        else{
            return this.dataStorageService.getRecipes();
        }
    }
}
