import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InfoPessoalComponent } from './info-pessoal.component';

const routes: Routes = [{ path: '', component: InfoPessoalComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class InfoPessoalRoutingModule {}
