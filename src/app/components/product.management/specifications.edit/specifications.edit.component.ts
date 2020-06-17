import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PluginService, AlertService } from '../../../services';
import { ProductSpecificationService, LookupService } from '../../../services/models';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { BaseEditComponent } from '../../../components/base/base.edit.component';

@Component({
  selector: 'app-specifications-edit',
  templateUrl: './specifications.edit.component.html'
})
export class SpecificationsEditComponent extends BaseEditComponent implements OnInit {

  specificationsForm: FormGroup;
  record:any = null;
  specification_types: any = [];
  product_sku: any = [];
  isDataLoaded:boolean = false;

  constructor(public dialogRef: MatDialogRef<SpecificationsEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected specificationservice: ProductSpecificationService,
    private formBuilder: FormBuilder,
    private lookupService: LookupService,
    protected pluginService: PluginService,
    protected alertService: AlertService) { 
      super(pluginService);
    }

  ngOnInit() {
    this.specificationsForm = this.formBuilder.group({
      name: ['', Validators.required],
      specification_type_id: ['', Validators.required],
      enabled: [''],
      details: this.formBuilder.array([])
    });

    this.lookupService.getAll("specification_types")
      .subscribe(
          data => {
              this.specification_types = data.data;
          },
          error => {
              this.handleError(error, this.specificationsForm);
          });
    
    if (this.data.id > 0) {
      this.specificationservice.getRecord(this.data.id)
        .subscribe(
          data => {
            this.record = data.data;
            this.isDataLoaded = true;

            // populate the details
            let control = <FormArray>this.specificationsForm.controls.details;
            if (data.data.details.length > 0) {
              this.populateSkuDetails(data.data.details);
            } else {
              // populate sku details if details is empty
              this.populateSkuDetails();
            }
          },
          error => {
            this.handleError(error, this.specificationsForm);
          });
    } else {
      this.record = {};
      this.isDataLoaded = true;
      // populate sku details if record is new
      this.populateSkuDetails();
    }
  }

  populateSkuDetails(data = null) {
    let control = <FormArray>this.specificationsForm.controls.details;
    if (data) {
      data.forEach(x => {
        control.push(this.formBuilder.group({ 
          id: x.id,
          value: x.value,
          sku_id: x.sku_id,
          sku_name: x.sku_name
        }))
      })
    } else {
      if (this.product_sku.length == 0) {
        this.lookupService.getAll("products/" + this.data.parent_id + "/sku")
        .subscribe(
          data => {
            this.product_sku = data.data;
            this.product_sku.forEach(x => {
              control.push(this.formBuilder.group({ 
                id: 0,
                value: '',
                sku_id: x.id,
                sku_name: x.name
              }))
            })
          },
          error => {
            this.handleError(error, this.specificationsForm);
          });
      } else {
        this.product_sku.forEach(x => {
          control.push(this.formBuilder.group({ 
            id: 0,
            value: '',
            sku_id: x.id,
            sku_name: x.name
          }))
        })
      }
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    this.record = this.specificationsForm.value;
    this.record.id = this.data.id;
    this.record.product_id = this.data.parent_id;

    if (this.data.id > 0) {
        this.specificationservice.save(this.record)
        .subscribe(
            data => {
                this.record = data.data;
            },
            error => {
                this.handleError(error, this.specificationsForm);
            });
    } else {
        this.specificationservice.create(this.record, this.data.parent_id)
        .subscribe(
            data => {
                this.data.id = data.data.id;
                this.record = data.data;
            },
            error => {
                this.handleError(error, this.specificationsForm);
            });
    }
  }
}
