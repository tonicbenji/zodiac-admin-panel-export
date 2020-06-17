import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DealerService } from '../../../services/models';
import { BaseListComponent } from '../../base/base.list.component';

@Component({
    templateUrl: './dealer.component.html'
})

export class  DealerComponent extends BaseListComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private dealerService: DealerService,
        protected injector: Injector
    ) { 
        super(dealerService, injector, 'dealers');
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.record_id = id;
            this.mode = 'edit';
        }

        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 25,
            ajax: this.getAjaxConfig('dealers'),
            "columns": [
                {
                    data: "id",
                    title: "ID"
                },
                {
                    data: "name",
                    title: "Name"
                },
                {
                    data: "account_number",
                    title: "Account Number"
                },
                {
                    data: "enabled",
                    title: "Enabled",
                    render: function(data: any, type: any, full: any) {
                        return '<label class="switcher switcher-rounded switcher-success"><input type="checkbox" value="' + full.enabled + '" toggle-record-id="' + full.id + '" class="submit" ' + (full.enabled == 1 ? 'checked="checked"' : '') + '><div class="switcher-indicator"><div class="switcher-yes">YES</div><div class="switcher-no">NO</div></div></label>';
                    }
                },
                {
                    data: "suburb",
                    title: "Suburb"
                },
                {
                    data: "state",
                    title: "State"
                },
                {
                    data: "country",
                    title: "Country"
                },
                {
                    data: "view_count",
                    title: "View Count"
                },
                {
                    data: "click_count",
                    title: "Click Count"
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
