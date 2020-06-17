import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FaqService } from '../../../services/models';
import { BaseListComponent } from '../../base/base.list.component';

@Component({
    templateUrl: './faq.component.html'
})

export class FaqComponent extends BaseListComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private faqService: FaqService,
        protected injector: Injector
    ) {
        super(faqService, injector, 'faq');
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.record_id = id;
            this.mode = 'edit';
        }

        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 25,
            ajax: this.getAjaxConfig('faq'),
            "columns": [
                {
                    data: "question",
                    title: "Question"
                },
                {
                    data: "category_name",
                    title: "Category"
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

    ngOnInit() {

    }
    ngAfterViewInit(): void {
        this.bindListeners();
    }
    ngOnDestroy() {
        this.clearListeners();
    }
    addRecord() {
        this.record_id = 'new';
        this.mode = 'edit';
    }
}
