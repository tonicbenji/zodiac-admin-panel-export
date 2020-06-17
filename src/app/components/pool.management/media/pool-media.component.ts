import { Component, OnInit, Input, Injector } from '@angular/core';
import { PoolMediaService } from '../../../services/models';
import { MatDialog } from '@angular/material';
import { PoolMediaEditComponent } from '../media.edit/pool-media.edit.component';
import { BaseListComponent } from '../../base/base.list.component';

@Component({
  selector: 'app-pool-media',
  templateUrl: './pool-media.component.html'
})

export class PoolMediaComponent extends BaseListComponent implements OnInit {

  @Input() parent_id:any;

  constructor(
    private mediaService: PoolMediaService,
    public dialog: MatDialog,
    public injector: Injector
  ) { 
    super(mediaService, injector, "pools/media");
  }

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(PoolMediaEditComponent, {
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

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      ajax: this.getAjaxConfig('pools/' + this.parent_id + '/media'),
      "columns": [
        {
          data: "caption",
          title: "Caption"
        },
        {
          data: "media_type_name",
          title: "Media Type"
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
