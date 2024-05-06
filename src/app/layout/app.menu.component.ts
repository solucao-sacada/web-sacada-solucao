import { MENU_ADMIN } from './../menu-admin/menu-admin';
import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import { MENUS } from '../menus/menus';
import { AuthService } from '../services/auth.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private authService: AuthService
    ) {}

    ngOnInit() {
        this.loadMenu()
    }

    loadMenu() {
        const user = this.authService.getUser()
        console.log(user.role)
        if(user.role === 'ADMIN'){
            this.model = MENUS;
        }else{
            this.model = MENU_ADMIN
        }
    }
}
