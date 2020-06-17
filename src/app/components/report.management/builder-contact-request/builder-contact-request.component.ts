import { Component, OnInit, Injector } from '@angular/core';
import { ReportService } from '../../../services/models';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from '../../base/base.list.component';

@Component({
    templateUrl: './builder-contact-request.component.html'
})

export class BuilderContactRequestComponent extends BaseListComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private reportService: ReportService,
        public injector: Injector
    ) { 
        super(reportService, injector, 'builder_contact_request');
    }

    ngOnInit() {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 25,
            ajax: this.getAjaxConfig('reports/builder_contact_requests'),
            "columns": [
                {
                    data: "first_name",
                    title: "First Name"
                },
                {
                    data: "last_name",
                    title: "Last Name"
                },
                {
                    data: "email",
                    title: "Email"
                },
                {
                    data: "contact_number",
                    title: "Contact Number"
                },
                {
                    data: "location",
                    title: "Location"
                },
                {
                    data: "pool_style",
                    title: "Pool Style"
                },
                {
                    data: "created_at",
                    title: "Submitted At"
                }
            ]
        }
    }
}
