import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PluginService, AlertService } from '../../../services';
import { PoolMediaService, LookupService } from '../../../services/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseEditComponent } from '../../../components/base/base.edit.component';

@Component({
  selector: 'app-pool-media-edit',
  templateUrl: './pool-media.edit.component.html'
})
export class PoolMediaEditComponent extends BaseEditComponent implements OnInit {

  mediaForm: FormGroup;
  record:any = null;
  media_types: any = [];
  isDataLoaded:boolean = false;

  constructor(public dialogRef: MatDialogRef<PoolMediaEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected mediaService: PoolMediaService,
    private formBuilder: FormBuilder,
    protected pluginService: PluginService,
    protected alertService: AlertService,
    protected lookupService: LookupService) { 
      super(pluginService);
    }

  ngOnInit() {
    this.mediaForm = this.formBuilder.group({
      caption: [''],
      media_type: ['', Validators.required],
      url: ['', Validators.required],
      order: [''],
      enabled: [''],
      video_id: [''],
    });

    this.lookupService.getAll("media_types")
      .subscribe(
          data => {
            this.media_types = data.data;
          },
          error => {
            this.handleError(error, this.mediaForm);
          });

    if (this.data.id > 0) {
      this.mediaService.getRecord(this.data.id)
        .subscribe(
          data => {
            this.record = data.data;
            this.isDataLoaded = true;
          },
          error => {
            this.handleError(error, this.mediaForm);
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
    this.record = this.mediaForm.value;
    this.record.id = this.data.id;
    this.record.pool_id = this.data.parent_id;

    if (this.data.id > 0) {
        this.mediaService.save(this.record)
        .subscribe(
            data => {
                this.record = data.data;
            },
            error => {
              this.handleError(error, this.mediaForm);
            });
    } else {
        this.mediaService.create(this.record, this.data.parent_id)
        .subscribe(
            data => {
                this.data.id = data.data.id;
                this.record = data.data;
            },
            error => {
              this.handleError(error, this.mediaForm);
            });
    }
  }
}
