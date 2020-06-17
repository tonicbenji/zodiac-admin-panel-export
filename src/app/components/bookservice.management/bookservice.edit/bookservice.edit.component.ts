import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PluginService, AlertService } from '../../../services';
import { BookServiceService, LookupService } from '../../../services/models';
import { BaseEditComponent } from '../../base/base.edit.component';

@Component({
    templateUrl: './bookservice.edit.component.html',
    selector: 'bookservice-edit'
})

export class  BookServiceEditComponent extends BaseEditComponent implements OnInit {

    record: any = null;
    products: any = null;
    dealerForm: FormGroup;
    @Input() id: any = null;
    @Output() close = new EventEmitter();

    constructor(
        private router: Router,
        private bookServiceService: BookServiceService,
        protected pluginService: PluginService,
        private formBuilder: FormBuilder,
        protected alertService: AlertService
    ) {
        super(pluginService);
    }

    ngOnInit() {
      this.dealerForm = this.formBuilder.group({
            first_name: [''],
            surname: [''],
            email: [''],
            preferred_contact_method: [''],
            phone: [''],
            mobile: [''],
            country: [''],
            state: [''],
            suburb: [''],
            street_1: [''],
            street_2: [''],
            postcode: [''],
            property_type: [''],
            business_name: [''],
            contact_name: [''],
            contact_number: [''],
            additional_information: [''],
            warranty_on_repairs: [''],
            created_at: [''],
            updated_at: [''],
            salesforce_status:[''],
            salesforce_try:[''],
            salesforce_completed:[''],
            salesforce_started:[''],            
        });

        if (this.id != 'new') {
            this.bookServiceService.getRecord(this.id)
                .subscribe(
                    data => {
                        this.record = data.data;
                        this.products = JSON.parse(this.record.products);

                    },
                    error => {
                        
                    });
        } else {
            this.record = { 
           }
        }

    }

    cancel() {
        this.close.emit();
    }
}
