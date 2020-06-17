import { Component, OnInit, Input, Injector } from '@angular/core';
import { ProductSkuService } from '../../../services/models';
import { SkuEditComponent } from '../sku.edit/sku.edit.component';
import { MatDialog } from '@angular/material';
import { BaseListComponent } from '../../base/base.list.component';

@Component({
  selector: 'app-sku',
  templateUrl: './sku.component.html'
})
export class SkuComponent extends BaseListComponent implements OnInit {

  @Input() parent_id: any;

  constructor(
    private skuService: ProductSkuService,
    public dialog: MatDialog,
    public injector: Injector
  ) {
    super(skuService, injector, "products/sku");
  }

  /**
   * Overridden method
   */

  openDialog(id: any): void {
    const dialogRef = this.dialog.open(SkuEditComponent, {
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
      ajax: this.getAjaxConfig("products/" + this.parent_id + "/sku"),
      "columns": [
        {
          data: "name",
          title: "Name"
        },
        {
          data: "sku",
          title: "Sku"
        },
        {
          data: "primary",
          title: "Primary",
          render: function (data: any, type: any, full: any) {
            if (full.primary == 1) {
              return '<label class="text-success p-x-1">Yes</label>';
            } else {
              return '<label class="text-warning p-x-1">No</label>';
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
