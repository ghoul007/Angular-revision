import { SharedModule } from './../shared/shared.module';
import { AuthGaurd } from './auth.guard';
import { RouterModule } from '@angular/router';
import { AuthComponent } from './auth.component';
import { AuthServise } from './auth.Service';
import { NgModule } from "@angular/core";
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [AuthComponent],
    imports: [FormsModule, SharedModule, RouterModule.forChild([{ path: 'auth', component: AuthComponent }])],
    providers: [AuthServise, AuthGaurd]
})

export class AuthModule { }