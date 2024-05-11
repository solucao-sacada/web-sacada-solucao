import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { VerificationRoutingModule } from "./verification-routing.module";
import { VerificationComponent } from "./verification.component";

NgModule({
    imports: [
        CommonModule,
        VerificationRoutingModule
    ],
    declarations: [ VerificationComponent ]
})

export class VerificationModule { }