import { Component, OnInit, Injector } from '@angular/core';
import { PageService } from '../../../services/models';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from '../../base/base.list.component';

@Component({
    templateUrl: './microsites.component.html'
})

export class  MicroSitesComponent extends BaseListComponent implements OnInit {
    
    entity: string = 'Micro Sites';

    constructor(
        private route: ActivatedRoute,
        private pageService: PageService,
        public injector: Injector
    ) {
        super(pageService, injector, 'microsites');
        pageService.setType('microsites');

        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.record_id = id;
            this.mode = 'edit';
        }
    }

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 25,
            ajax: this.getAjaxConfig('microsites'),
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
                        if (full.system == 1) {
                            return '<label class="bg-success p-x-2 border-round">' + (full.enabled == 1 ? 'YES' : 'NO')  + '</label>';
                        } else {
                            return '<label class="switcher switcher-rounded switcher-success"><input type="checkbox" value="' + full.enabled + '" toggle-record-id="' + full.id + '" class="submit" ' + (full.enabled == 1 ? 'checked="checked"' : '') + '><div class="switcher-indicator"><div class="switcher-yes">YES</div><div class="switcher-no">NO</div></div></label>';
                        }
                  }
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
                data: "system",
                title: "System",
                visible: false
              },
              {
                  title: 'Action',
                  orderable: false,
                  render: function (data: any, type: any, full: any) {
                      let edit_action = '<a edit-record-id="' + full.id + '" class="btn btn-primary">Edit</a>';
                      let delete_action = '<a delete-record-id="' + full.id + '" class="btn btn-danger">Delete</a>';
                      if (full.system == 1) {
                        return edit_action;
                      } else {
                        return edit_action + "&nbsp;&nbsp;" + delete_action;
                      }
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
    addPage() {
        this.record_id = 'new';
        this.mode = 'edit';
    }
}
