import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PluginService, AlertService } from '../../../services';
import { WarrantyService, LookupService } from '../../../services/models';
import { BaseEditComponent } from '../../base/base.edit.component';

@Component({
    templateUrl: './warranty.edit.component.html',
    selector: 'warranty-edit'
})

export class  WarrantyEditComponent extends BaseEditComponent implements OnInit {

    record: any = null;
    products: any = null;
    products_files: any = null;
    dealerForm: FormGroup;
    @Input() id: any = null;
    @Output() close = new EventEmitter();

    constructor(
        private router: Router,
        private warrantyService: WarrantyService,
        protected pluginService: PluginService,
        private formBuilder: FormBuilder,
        protected alertService: AlertService
    ) {
        super(pluginService);
    }

    ngOnInit() {
      this.dealerForm = this.formBuilder.group({
            full_name: [''],
            email: [''],
            date_of_birth: [''],
            country: [''],
            state: [''],
            suburb: [''],
            address_line_1: [''],
            address_line_2: [''],
            postcode: [''],
            telephone: [''],
            mobile: [''],
            opt_in_for_marketing: [''],
            date_of_purchase: [''],
            how_did_you_first_learn: [''],
            dealer_country: [''],
            dealer_state: [''],
            dealer_suburb: [''],
            dealer_name: [''],
            who_is_mainly_responsible: [''],
            how_often_is_your_pool_used_in_summer: [''],
            how_often_is_your_pool_used_in_winter: [''],
            pool_construction: [''],
            pool_size_shape: [''],
            pool_age: [''],
            do_you_have_an_outside_spa: [''],
            what_equipment_do_you_have: [''],
            what_do_you_most_like_about_owning_a_pool: [''],
            what_do_you_least_like_about_owning_a_pool: [''],
            salesforce_status:[''],
            salesforce_try:[''],
            salesforce_completed:[''],
            salesforce_started:[''],            
            created_at: [''],
            updated_at: ['']
        });

        if (this.id != 'new') {
            this.warrantyService.getRecord(this.id)
                .subscribe(
                    data => {
                        this.record = data.data;                        
                        this.products_files = this.record.products_files;
                    },
                    error => {
                        
                    });
        } else {
            this.record = { 
           }
        }

    }

    replaceString(text)
    {
        return text.replace(/\//g,"abc123");
    }

    cancel() {
        this.close.emit();
    }
}
