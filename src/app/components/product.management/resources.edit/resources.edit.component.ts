import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PluginService, AlertService } from '../../../services';
import { ProductResourceService, LookupService } from '../../../services/models';
import { first } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseEditComponent } from '../../../components/base/base.edit.component';

@Component({
  selector: 'app-resources-edit',
  templateUrl: './resources.edit.component.html'
})
export class ResourcesEditComponent extends BaseEditComponent implements OnInit {

  resourcesForm: FormGroup;
  record:any = null;
  resource_types: any = [];
  isDataLoaded:boolean = false;

  constructor(public dialogRef: MatDialogRef<ResourcesEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected resourceservice: ProductResourceService,
    private formBuilder: FormBuilder,
    private lookupService: LookupService,
    protected pluginService: PluginService,
    protected alertService: AlertService) { 
      super(pluginService);
    }

  ngOnInit() {
    this.resourcesForm = this.formBuilder.group({
      name: ['', Validators.required],
      resource_type_id: ['', Validators.required],
      resource_url: [''],
      order: [''],
      enabled: [''],
    });

    this.lookupService.getAll("resource_types")
      .subscribe(
          data => {
              this.resource_types = data.data;
          },
          error => {
              this.handleError(error, this.resourcesForm);
          });
    
    if (this.data.id > 0) {
      this.resourceservice.getRecord(this.data.id)
        .subscribe(
          data => {
            this.record = data.data;
            this.isDataLoaded = true;
          },
          error => {
            this.handleError(error, this.resourcesForm);
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
    this.record = this.resourcesForm.value;
    this.record.id = this.data.id;
    this.record.product_id = this.data.parent_id;

    if (this.data.id > 0) {
        this.resourceservice.save(this.record)
        .subscribe(
            data => {
                this.record = data.data;
            },
            error => {
                this.handleError(error, this.resourcesForm);
            });
    } else {
        this.resourceservice.create(this.record, this.data.parent_id)
        .subscribe(
            data => {
                this.data.id = data.data.id;
                this.record = data.data;
            },
            error => {
                this.handleError(error, this.resourcesForm);
            });
    }
  }
}
