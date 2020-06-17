import { Component, OnInit, Injector } from '@angular/core';
import { CategoryService } from '../../../services/models';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from '../../base/base.list.component';

@Component({
    templateUrl: './categories.component.html'
})

export class  CategoriesComponent extends BaseListComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private categoryService: CategoryService,
        public injector: Injector
    ) { 
        super(categoryService, injector, 'categories');
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
            ajax: this.getAjaxConfig('categories'),
            "columns": [
                {
                    data: "name",
                    title: "Name"
                },
                {
                    data: "slug",
                    title: "Slug"
                },
                {
                    data: "zone",
                    title: "Zone"
                },
                {
                    data: "enabled",
                    title: "Enabled",
                    render: function(data: any, type: any, full: any) {
                        return '<label class="switcher switcher-rounded switcher-success"><input type="checkbox" value="' + full.enabled + '" toggle-record-id="' + full.id + '" class="submit" ' + (full.enabled == 1 ? 'checked="checked"' : '') + '><div class="switcher-indicator"><div class="switcher-yes">YES</div><div class="switcher-no">NO</div></div></label>';
                    }
                },
                {
                    data: "order",
                    title: "Order"
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
    addCategory() {
        this.record_id = 'new';
        this.mode = 'edit';
    }
}
