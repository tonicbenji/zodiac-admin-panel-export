import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { PluginService, AlertService } from '../../../services';
import { UserService } from '../../../services/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseEditComponent } from '../../../components/base/base.edit.component';

@Component({
  selector: 'app-password-edit',
  templateUrl: './password.edit.component.html'
})
export class PasswordEditComponent extends BaseEditComponent implements OnInit {

  updateForm: FormGroup;
  record:any = null;
  isDataLoaded:boolean = false;

  constructor(public dialogRef: MatDialogRef<PasswordEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    protected userService: UserService,
    private formBuilder: FormBuilder,
    protected pluginService: PluginService,
    protected alertService: AlertService) { 
      super(pluginService);
    }

  ngOnInit() {
    this.updateForm = this.formBuilder.group({
      password: [''],
      password_confirmation: ['']
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  save() {
    this.record = this.updateForm.value;
    this.record.id = this.data.user_id;
    this.userService.editPassword(this.record)
        .subscribe(
            data => {
                this.dialogRef.close();
            },
            error => {
                this.handleError(error, this.updateForm);
            });
    }
}
