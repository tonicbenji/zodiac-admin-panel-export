import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WarrantyService, LookupService } from '../../../services/models';
import { BaseListComponent } from '../../base/base.list.component';

@Component({
    templateUrl: './warranty.component.html'
})

export class  WarrantyComponent extends BaseListComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private warrantyService: WarrantyService,
        private lookupService: LookupService,
        protected injector: Injector,
    ) { 
        super(warrantyService, injector, 'warranties');
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.record_id = id;
            this.mode = 'edit';
        }

        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 25,
            ajax: this.getAjaxConfig('warranties'),
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
                    data: "date-of-purchase",
                    title: "Date of Purchase"
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
         this.lookupService.getAll("warranties_run_command")                
                .subscribe(
                    data => { 
                    window.alert('Cron job finished');                       
                    },
                    error => {                       
                    
                    });
        
    }

}
