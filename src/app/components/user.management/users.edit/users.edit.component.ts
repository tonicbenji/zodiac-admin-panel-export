import { Component, OnInit, Inject, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PluginService, AlertService } from '../../../services';
import { UserService } from '../../../services/models';
import { BaseEditComponent } from '../../base/base.edit.component';
import { MatDialog } from '@angular/material';
import { PasswordEditComponent } from '../password.edit/password.edit.component';

@Component({
    templateUrl: './users.edit.component.html',
    selector: 'users-edit'
})

export class  UsersEditComponent extends BaseEditComponent implements OnInit {

    userForm: FormGroup;
    record: any = null;
    flash: any = {};
    @Input() id: any = null;
    @Output() close = new EventEmitter();

    constructor(
        private router: Router,
        private userService: UserService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        protected pluginService: PluginService,
        protected alertService: AlertService,
        public dialog: MatDialog,
    ) { 
        super(pluginService);
    }
    ngOnInit() {
        this.userForm = this.formBuilder.group({
            first_name: ['', Validators.required],
            last_name: ['', Validators.required],
            email: ['', Validators.required]
        });

        if (this.id != 'new') {
            this.userService.getRecord(this.id)
                .subscribe(
                    data => {
                        this.record = data.data;
                    },
                    error => {
                        this.record = {};
                        this.handleError(error, this.userForm);
                    });
        } else {
            this.record = {};
        }
    }
    cancel() {
        this.close.emit();
    }
    save() {
        this.record = this.userForm.value;
        this.record.id = this.id;
        if (this.id != 'new') {
            this.userService.save(this.record)
            .subscribe(
                data => {
                    this.record = data.data;
                },
                error => {
                    this.handleError(error, this.userForm);
                });
        } else {
            this.userService.create(this.record)
            .subscribe(
                data => {
                    this.id = data.data.id;
                    this.record = data.data;
                    this.router.navigate(['/users/' + data.data.id]);
                },
                error => {
                    this.handleError(error, this.userForm);
                });
        }
    }
    sendPasswordResetLink() {
        this.userService.sendPasswordUpdateLink(this.record)
            .subscribe(data => {
                this.flash.success = 'Password update link send to user.';
            }, error => {
            }, () => {
                setTimeout(function () {
                    this.flash = {};
                }, 2000);
            })
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(PasswordEditComponent, {
            width: '60%',
            data: {
                "user_id": this.id
            }
        });
    }
}
