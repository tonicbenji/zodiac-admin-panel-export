
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services';

@Component({template: ''})
export class LoginComponent implements OnInit {
    
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        } else {
            this.authenticationService.showLogin();
        }
    }

    ngOnInit() {
    }
}
