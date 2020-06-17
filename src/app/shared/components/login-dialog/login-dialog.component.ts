import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AlertService, AuthenticationService } from '../../../services';

@Component({
    templateUrl: 'login-dialog.component.html',
    selector: 'login-dialog'
})
export class LoginDialogComponent implements OnInit {
    
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    record: any = {
        username: '',
        password: ''
    };

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: [''],
            password: ['']
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    onSubmit() {
        this.submitted = true;
        this.record = this.loginForm.value;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.login(this.record.username, this.record.password)
            .subscribe(
                data => {
                    this.authenticationService.loggedIn();
                    this.router.navigate(['/']);
                },
                error => {
                    this.handleError(error, this.loginForm);
                    this.loading = false;
                });
    }

    handleError(response: any, form: FormGroup) {
        if (response.error.errors) {
            for (let key in response.error.errors) {
                if (form.get(key)) {
                    form.get(key).setErrors({ 'server_validation': response.error.errors[key][0] });
                    form.get(key).markAsTouched();
                }
            }
        } else {
            this.alertService.error(response.error.error);
        }
    }

    close() {
        this.authenticationService.loginPopup = false;
        this.router.navigate(['/register']);
    }
}
