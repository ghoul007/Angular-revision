import { SharedModule } from './../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { ShoppingListComponent } from './shopping-list.component';
import { NgModule } from "@angular/core";

@NgModule({

    declarations: [ShoppingListComponent, ShoppingEditComponent],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: 'shopping-list', component: ShoppingListComponent }
        ]),
        SharedModule
    ],
    exports: [ShoppingListComponent, ShoppingEditComponent]

})


export class ShoppingListModule { }