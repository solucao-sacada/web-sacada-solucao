import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PasswordUpdateComponent } from "./password-update.component";


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: PasswordUpdateComponent }
    ])],
    exports: [RouterModule]
})
export class PasswordUpdateRoutingModule { }