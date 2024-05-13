import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { VerificationComponent } from "./verification.component";
import { ComponentsModule } from "src/app/components/components.module";
import { VerificationRoutingModule } from "./verification-routing.module";

@NgModule({
    imports: [
        CommonModule,
        VerificationRoutingModule,
        ComponentsModule
    ],
    declarations: [ VerificationComponent ]
})

export class VerificationModule { }
