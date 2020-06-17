import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BannerService, LookupService } from '../../../services/models';
import { BaseListComponent } from '../../base/base.list.component';

@Component({
    templateUrl: './banner.component.html'
})

export class  BannerComponent extends BaseListComponent implements OnInit {
    constructor(
        private route: ActivatedRoute,
        private bannerService: BannerService,
        private lookupService: LookupService,
        protected injector: Injector,
    ) { 
        super(bannerService, injector, 'banners');
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.record_id = id;
            this.mode = 'edit';
        }       
    }
    
    ngOnInit(): void  {
          this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 25,
            ajax: this.getAjaxConfig('banners'),
            "columns": [
              {
                  data: "name",
                  title: "Name"
              },
              {
                  data: "title",
                  title: "Title"
              },
              {
                  data: "type",
                  title: "Type"
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
                  data: "start_date",
                  title: "Start Date"
              },
              {
                  data: "end_date",
                  title: "End Date"
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
          };
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
