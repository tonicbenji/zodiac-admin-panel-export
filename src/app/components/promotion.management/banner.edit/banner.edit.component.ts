import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PluginService, AlertService } from '../../../services';
import { BannerService, LookupService } from '../../../services/models';
import { BaseEditComponent } from '../../base/base.edit.component';

@Component({
    templateUrl: './banner.edit.component.html',
    selector: 'banner-edit'
})

export class  BannerEditComponent extends BaseEditComponent implements OnInit {

    bannerForm: FormGroup;
    record: any = null;
    types: any = ['header','middle','footer', 'slider'];
    zones:any = [];
    @Input() id: any = null;
    @Output() close = new EventEmitter();

    constructor(
        private router: Router,
        private bannerService: BannerService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private lookupService: LookupService,
        protected pluginService: PluginService,
        protected alertService: AlertService,
    ) {
        super(pluginService);
    }

    ngOnInit() {
        this.bannerForm = this.formBuilder.group({
            name: [''],
            title: [''],
            is_on_page: [''],
            is_on_product: [''],
            is_on_category: [''],
            is_on_pool: [''],
            is_on_promotion: [''],
            desc: [''],
            icon: [''],
            image: [''],
            link: [''],
            type: [''],
            start_date: [''],
            end_date: [''],            
            order: [''],
            enabled: [''],
            zone: [''],
        });

        
        this.lookupService.getAll("zones")
            .subscribe(
                data => {
                    this.zones = data.data;
                },
                error => {
                    this.handleError(error, this.bannerForm);
                });

        if (this.id != 'new') {
            this.bannerService.getRecord(this.id)
                .subscribe(
                    data => {
                        this.record = data.data;
                    },
                    error => {
                        this.handleError(error, this.bannerForm);
                    });
        } else {
            this.record = {
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
        this.record = this.bannerForm.value;
        this.record.id = this.id;
        
        if (this.id != 'new') {
            this.bannerService.save(this.record)
            .subscribe(
                data => {
                    this.record = data.data;
                },
                error => {
                    this.handleError(error, this.bannerForm);
                });
        } else {
            this.bannerService.create(this.record)
            .subscribe(
                data => {
                    this.id = data.data.id;
                    this.record = data.data;
                    this.router.navigate(['/banners/' + data.data.id]);
                },
                error => {
                    this.handleError(error, this.bannerForm);
                });
        }
    }
   
}
