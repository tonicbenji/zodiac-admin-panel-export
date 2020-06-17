import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PluginService, AlertService } from '../../../services';
import { TagService, LookupService } from '../../../services/models';
import { BaseEditComponent } from '../../base/base.edit.component';

@Component({
    templateUrl: './tag.edit.component.html',
    selector: 'tag-edit'
})

export class  TagEditComponent extends BaseEditComponent implements OnInit {

    tagForm: FormGroup;
    record: any = null;
    zones:any = [];
    products_lookup_endpoint: string = "products";
    @Input() id: any = null;
    @Output() close = new EventEmitter();

    constructor(
        private router: Router,
        private tagService: TagService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private lookupService: LookupService,
        protected pluginService: PluginService,
        protected alertService: AlertService,
    ) {
        super(pluginService);
    }

    ngOnInit() {
        this.tagForm = this.formBuilder.group({
            name: [''],
            desc: [''],
            start_date: [''],
            end_date: [''],            
            enabled: [''],
            zone: [''],
            product_ids : [''],
        });

        
        this.lookupService.getAll("zones")
            .subscribe(
                data => {
                    this.zones = data.data;
                },
                error => {
                    this.handleError(error, this.tagForm);
                });

        if (this.id != 'new') {
            this.tagService.getRecord(this.id)
                .subscribe(
                    data => {
                        this.record = data.data;
                    },
                    error => {
                        this.handleError(error, this.tagForm);
                    });
        } else {
            this.record = {
                "product_ids": {"data": []},
            };
        }
    }

    cancel() {
        this.close.emit();
    }

    reset(value) {
        if(value == 'start_date')
        this.record.start_date = '';
        else
        if(value == 'end_date')
        this.record.end_date = '';
      }    

    save() {
        let product_ids =  this.record.product_ids;
        this.record = this.tagForm.value;
        this.record.id = this.id;
        this.record.product_ids = product_ids;
        
        if (this.id != 'new') {
            this.tagService.save(this.record)
            .subscribe(
                data => {
                    this.record = data.data;
                },
                error => {
                    this.handleError(error, this.tagForm);
                });
        } else {
            this.tagService.create(this.record)
            .subscribe(
                data => {
                    this.id = data.data.id;
                    this.record = data.data;
                    this.router.navigate(['/tags/' + data.data.id]);
                },
                error => {
                    this.handleError(error, this.tagForm);
                });
        }
    }
   
}
