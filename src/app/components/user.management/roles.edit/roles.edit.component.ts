import { Component, OnInit, Inject, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PluginService, AlertService } from '../../../services';
import { RoleService } from '../../../services/models';
import { BaseEditComponent } from '../../base/base.edit.component';

@Component({
    templateUrl: './roles.edit.component.html',
    selector: 'roles-edit'
})

export class  RolesEditComponent extends BaseEditComponent implements OnInit {

    roleForm: FormGroup;
    record: any = null;
    @Input() id: any = null;

    @Output() close = new EventEmitter();

    constructor(
        private router: Router,
        private roleService: RoleService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        protected pluginService: PluginService,
        protected alertService: AlertService
    ) { 
        super(pluginService);
    }

    ngOnInit() {
        this.roleForm = this.formBuilder.group({
            name: ['', Validators.required]
        });

        if (this.id != 'new') {
            this.roleService.getRecord(this.id)
                .subscribe(
                    data => {
                        this.record = data.data;
                    },
                    error => {
                        this.record = {};
                        this.handleError(error, this.roleForm);
                    });
        } else {
            this.record = {};
        }
    }

    cancel() {
        this.close.emit();
    }

    save() {
        this.record = this.roleForm.value;
        this.record.id = this.id;
        if (this.id != 'new') {
            this.roleService.save(this.record)
            .subscribe(
                data => {
                    this.record = data.data;
                },
                error => {
                    this.handleError(error, this.roleForm);
                });
        } else {
            this.roleService.create(this.record)
            .subscribe(
                data => {
                    this.id = data.data.id;
                    this.record = data.data;
                    this.router.navigate(['/roles/' + data.data.id]);
                },
                error => {
                    this.handleError(error, this.roleForm);
                });
        }
    }
}
