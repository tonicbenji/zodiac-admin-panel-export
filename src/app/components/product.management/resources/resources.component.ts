import { Component, OnInit, Input, Injector } from '@angular/core';
import { ProductResourceService } from '../../../services/models';
import { ResourcesEditComponent } from '../resources.edit/resources.edit.component';
import { MatDialog } from '@angular/material';
import { BaseListComponent } from '../../base/base.list.component';
@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html'
})
export class ResourcesComponent extends BaseListComponent implements OnInit {

  @Input() parent_id: any;

  constructor(
    private resourceService: ProductResourceService,
    public dialog: MatDialog,
    public injector: Injector
  ) {
    super(resourceService, injector, "products/resources");
  }

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(ResourcesEditComponent, {
      width: '60%',
      data: {
        "id": id,
        "parent_id": this.parent_id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.reload();
    });
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      ajax: this.getAjaxConfig("products/" + this.parent_id + "/resources"),
      "columns": [
        {
          data: "name",
          title: "Name"
        },
        {
          data: "resource_type",
          title: "Resource Type"
        },
        {
          data: "enabled",
          title: "Enabled",
          render: function (data: any, type: any, full: any) {
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
            return '<a modal-record-id="' + full.id + '" class="btn btn-primary">Edit</a>&nbsp;&nbsp;<a delete-record-id="' + full.id + '" class="btn btn-danger">Delete</a>';
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

}
