import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PluginService, AlertService } from '../../../services';
import { ProductSkuService, LookupService } from '../../../services/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseEditComponent } from '../../../components/base/base.edit.component';

@Component({
  selector: 'app-sku-edit',
  templateUrl: './sku.edit.component.html'
})
export class SkuEditComponent extends BaseEditComponent implements OnInit {

  skuForm: FormGroup;
  record: any = null;
  isDataLoaded: boolean = false;

  constructor(public dialogRef: MatDialogRef<SkuEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected skuService: ProductSkuService,
    private formBuilder: FormBuilder,
    private lookupService: LookupService,
    protected pluginService: PluginService,
    protected alertService: AlertService) {
    super(pluginService);
  }

  ngOnInit() {
    this.skuForm = this.formBuilder.group({
      name: ['', Validators.required],
      sku: [''],
    });

    if (this.data.id > 0) {
      this.skuService.getRecord(this.data.id)
        .subscribe(
          data => {
            this.record = data.data;
            this.isDataLoaded = true;
          },
          error => {
            this.handleError(error, this.skuForm);
          });
    } else {
      this.record = {};
      this.isDataLoaded = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.record = this.skuForm.value;
    this.record.id = this.data.id;
    this.record.product_id = this.data.parent_id;
    this.record.enabled = 1;

    if (this.data.id > 0) {
      this.skuService.save(this.record)
        .subscribe(
          data => {
            this.record = data.data;
          },
          error => {
            this.handleError(error, this.skuForm);
          });
    } else {
      this.skuService.create(this.record, this.data.parent_id)
        .subscribe(
          data => {
            this.data.id = data.data.id;
            this.record = data.data;
          },
          error => {
            this.handleError(error, this.skuForm);
          });
    }
  }
}
