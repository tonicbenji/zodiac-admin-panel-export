import { Component, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, PluginService, AlertService } from './services';
import { User } from './models';

@Component({ selector: 'app', templateUrl: 'app.component.html'})
export class AppComponent implements AfterViewInit {

    currentUser: User;
    
    constructor(
        public router: Router,
        public authenticationService: AuthenticationService,
        public pluginService: PluginService,
        public alertService: AlertService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    openFM() {
        this.pluginService.filemanager();
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }

    hasPath(items: string[]) {
        return items.indexOf(this.router.url) > -1;
    }

    ngAfterViewInit(): void {
        (<any>$('body .px-nav')).pxNav();
    }
}