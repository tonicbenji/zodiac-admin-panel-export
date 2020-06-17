import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../services/models';
import { AuthenticationService, AlertService } from 'src/app/services';

@Component({
    templateUrl: './password.update.component.html',
    selector: 'password-update'
})

export class  PasswordUpdateComponent implements OnInit {

    resetForm: FormGroup;
    record: any = null;
    token: string = null;
    submitted = false;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) {
        this.token = this.route.snapshot.paramMap.get('token');

        // redirect to home if already logged in
        if (this.authenticationService.currentUserValue) { 
            this.router.navigate(['/']);
        }
    }

    ngOnInit() {
        this.resetForm = this.formBuilder.group({
            email: [''],
            password: [''],
            password_confirmation: [''],
        });

        this.userService.getPasswordUpdate(this.token)
            .subscribe(
                data => {
                    this.record = data;
                },
                error => {
                    this.handleError(error, this.resetForm);
                });
    }

    submit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.resetForm.invalid) {
            return;
        }

        this.record = this.resetForm.value;
        this.record.token = this.token;
        
        this.userService.submitPasswordUpdate(this.record)
        .subscribe(
            data => {
                this.alertService.success('Successfully updated password', true);
                this.router.navigate(['/login']);
            },
            error => {
                this.handleError(error, this.resetForm);
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
