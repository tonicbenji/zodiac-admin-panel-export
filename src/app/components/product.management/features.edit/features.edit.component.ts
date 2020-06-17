import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PluginService, AlertService } from '../../../services';
import { ProductFeatureService, LookupService } from '../../../services/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseEditComponent } from '../../../components/base/base.edit.component';

@Component({
  selector: 'app-features-edit',
  templateUrl: './features.edit.component.html'
})
export class FeaturesEditComponent extends BaseEditComponent implements OnInit {

  featuresForm: FormGroup;
  record:any = null;
  feature_types: any = [];
  isDataLoaded:boolean = false;

  constructor(public dialogRef: MatDialogRef<FeaturesEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected featureService: ProductFeatureService,
    private formBuilder: FormBuilder,
    private lookupService: LookupService,
    protected pluginService: PluginService,
    protected alertService: AlertService) { 
      super(pluginService);
    }

  ngOnInit() {
    this.featuresForm = this.formBuilder.group({
      name: ['', Validators.required],
      feature_type_id: ['', Validators.required],
      order: [''],
      enabled: [''],
      description: [''],
      list_image_url: [''],
      // list_video_id: [''],
      // list_video_url: [''],
    });

    this.lookupService.getAll("feature_types")
      .subscribe(
          data => {
              this.feature_types = data.data;
          },
          error => {
              this.handleError(error, this.featuresForm);
          });
    
    if (this.data.id > 0) {
      this.featureService.getRecord(this.data.id)
        .subscribe(
          data => {
            this.record = data.data;
            this.isDataLoaded = true;
          },
          error => {
            this.handleError(error, this.featuresForm);
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
    this.record = this.featuresForm.value;
    this.record.id = this.data.id;
    this.record.product_id = this.data.parent_id;

    if (this.data.id > 0) {
        this.featureService.save(this.record)
        .subscribe(
            data => {
                this.record = data.data;
            },
            error => {
              this.handleError(error, this.featuresForm);
            });
    } else {
        this.featureService.create(this.record, this.data.parent_id)
        .subscribe(
            data => {
                this.data.id = data.data.id;
                this.record = data.data;
            },
            error => {
              this.handleError(error, this.featuresForm);
            });
    }
  }
}
