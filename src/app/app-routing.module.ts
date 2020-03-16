import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




const approutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  // {
  //   path: 'recipes',
  //   loadChildren: './recipes/recipe.module#RecipeModule'
  // },


];

@NgModule({
  imports: [RouterModule.forRoot(approutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
