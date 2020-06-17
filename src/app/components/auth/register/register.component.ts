import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, AuthenticationService } from '../../../services';

@Component({templateUrl: 'register.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
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
        this.registerForm = this.formBuilder.group({
            first_name: [''],
            last_name: [''],
            email: [''],
            password: [''],
            password_confirmation: ['']
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;
        this.authenticationService.register(this.registerForm.value)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.handleError(error, this.registerForm);
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
            this.alertService.error(response.erorr.erorr);
        }
    }
}
