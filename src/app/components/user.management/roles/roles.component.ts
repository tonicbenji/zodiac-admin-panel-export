import { Component, OnInit, Injector } from '@angular/core';
import { RoleService } from '../../../services/models';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from '../../base/base.list.component';

@Component({
    templateUrl: './roles.component.html'
})

export class  RolesComponent extends BaseListComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private  roleService: RoleService,
        public injector: Injector
    ) {
        super(roleService, injector, 'roles');
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.record_id = id;
            this.mode = 'edit';
        }
     }

    ngOnInit() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 25,
            ajax: this.getAjaxConfig('roles'),
            "columns": [
                {
                    data: "name",
                    title: "Name"
                },
                {
                    data: "created_at",
                    title: "Created"
                },
                {
                    data: "updated_at",
                    title: "Updated"
                },
                {
                    data: "id",
                    title: "ID",
                    visible: false
                },
                {
                    title: 'Action',
                    orderable: false,
                    render: function (data: any, type: any, full: any) {
                        return '<a edit-record-id="' + full.id + '" class="btn btn-primary">Edit</a>&nbsp;&nbsp;<a delete-record-id="' + full.id + '" class="btn btn-danger">Delete</a>';
                    }
                }
            ]
        }
    }

    ngAfterViewInit(): void {
        this.bindListeners();
    }
    ngOnDestroy() {
        this.clearListeners();
    }
     addRole() {
        this.record_id = 'new';
        this.mode = 'edit';
    }
}
