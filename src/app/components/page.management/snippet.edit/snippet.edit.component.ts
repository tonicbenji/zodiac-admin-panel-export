import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PluginService, AlertService } from '../../../services';
import { SnippetService } from '../../../services/models';
import { BaseEditComponent } from '../../base/base.edit.component';

@Component({
  selector: 'snippet-edit',
  templateUrl: './snippet.edit.component.html',
  styleUrls: ['./snippet.edit.component.less']
})
export class SnippetEditComponent extends BaseEditComponent implements OnInit {

  form: FormGroup;
  record: any = null;
  categories: any = [];
  @Input() id: any = null;
  @Output() close = new EventEmitter();



  constructor(
    private router: Router,
    private snippetService: SnippetService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    protected pluginService: PluginService,
    protected alertService: AlertService
  ) {
    super(pluginService);
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      key: ['',  Validators.required],
      content: ['', Validators.required]
    });

    if (this.id != 'new') {
      this.snippetService.getRecord(this.id)
        .subscribe(
          data => {
            this.record = data.data;
          },
          error => {
            this.handleError(error, this.form);
          });
    } else {
      this.record = {};
    }


  }

  cancel() {
    this.close.emit();
  }

  save() {

    this.record = this.form.value;
    let re = / /gi; 
    let key: String = this.record.key;
    this.record.key = key.replace(re, "").toLowerCase();
    this.record.id = this.id;
    if (this.id != 'new') {
      this.snippetService.save(this.record)
        .subscribe(
          data => {
            this.record = data.data;
          },
          error => {
            this.handleError(error, this.form);
          }); 
    } else {
      this.snippetService.create(this.record)
        .subscribe(
          data => {
            this.id = data.data.id;
            this.record = data.data;
          },
          error => {
            this.handleError(error, this.form);
          });
    }


  }


}
