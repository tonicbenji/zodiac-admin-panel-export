import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookServiceService, LookupService } from '../../../services/models';
import { BaseListComponent } from '../../base/base.list.component';

@Component({
    templateUrl: './bookservice.component.html'
})

export class  BookServiceComponent extends BaseListComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private bookServiceService: BookServiceService,
        private lookupService: LookupService,
        protected injector: Injector,
    ) { 
        super(bookServiceService, injector, 'bookservices');
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.record_id = id;
            this.mode = 'edit';
        }

        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 25,
            ajax: this.getAjaxConfig('bookservices'),
			order: [[ 8, "desc" ]],
            "columns": [
                {
                    data: "full_name",
                    title: "Full Name"
                },
                {
                    data: "email",
                    title: "Email"
                },
                {
                    data: "phone",
                    title: "Phone"
                },
                {
                    data: "salesforce_started",
                    title: "SF Started Time"
                },
                {
                    data: "salesforce_completed",
                    title: "SF Completed Time"
                },
                {
                    data: "salesforce_try",
                    title: "SF Attempts"
                },
                {
                    data: "created_at",
                    title: "Created"
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
                        return '<a edit-record-id="' + full.id + '" class="btn btn-primary">Show</a>&nbsp;&nbsp;<a delete-record-id="' + full.id + '" class="btn btn-danger">Delete</a>';
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

    salesForce() {
         window.alert('Cron job started, after some time refresh the screen'); 
         this.lookupService.getAll("bookservice_run_command")                
                .subscribe(
                    data => { 
                    window.alert('Cron job finished');                       
                    },
                    error => {                       
                    
                    });
        
    }

}
