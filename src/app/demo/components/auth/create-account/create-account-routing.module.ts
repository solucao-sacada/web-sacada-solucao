import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CreateAccountComponent } from './create-account.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: CreateAccountComponent }
    ])],
    exports: [RouterModule]
})
export class CreateAccountRoutingModule { }
