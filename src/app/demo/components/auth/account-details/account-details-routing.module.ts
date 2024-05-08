import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccountDetailsComponent } from './account-details.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: AccountDetailsComponent }
    ])],
    exports: [RouterModule]
})
export class AccountDetailsRoutingModule { }
