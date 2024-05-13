import { NgModule } from "@angular/core";
import { VerificationComponent } from "./verification.component";
import { RouterModule } from "@angular/router";


@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: VerificationComponent }
    ])],
    exports: [RouterModule]
})

export class VerificationRoutingModule { }
