import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PluginService, AlertService } from '../../../services';
import { ProductImageService } from '../../../services/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseEditComponent } from '../../../components/base/base.edit.component';

@Component({
  selector: 'app-product-images-edit',
  templateUrl: './product-images.edit.component.html'
})
export class ProductImagesEditComponent extends BaseEditComponent implements OnInit {

  imageForm: FormGroup;
  record:any = null;
  isDataLoaded:boolean = false;

  constructor(public dialogRef: MatDialogRef<ProductImagesEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected imageService: ProductImageService,
    private formBuilder: FormBuilder,
    protected pluginService: PluginService,
    protected alertService: AlertService) { 
      super(pluginService);
    }

  ngOnInit() {
    this.imageForm = this.formBuilder.group({
      url: ['', Validators.required],
      order: [''],
      enabled: ['']
    });

    if (this.data.id > 0) {
      this.imageService.getRecord(this.data.id)
        .subscribe(
          data => {
            this.record = data.data;
            this.isDataLoaded = true;
          },
          error => {
            this.handleError(error, this.imageForm);
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
    this.record = this.imageForm.value;
    this.record.id = this.data.id;
    this.record.product_id = this.data.parent_id;

    if (this.data.id > 0) {
        this.imageService.save(this.record)
        .subscribe(
            data => {
                this.record = data.data;
            },
            error => {
              this.handleError(error, this.imageForm);
            });
    } else {
        this.imageService.create(this.record, this.data.parent_id)
        .subscribe(
            data => {
                this.data.id = data.data.id;
                this.record = data.data;
            },
            error => {
              this.handleError(error, this.imageForm);
            });
    }
  }
}
