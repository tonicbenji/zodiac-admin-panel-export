import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PluginService, AlertService } from '../../../services';
import { DealerService, LookupService } from '../../../services/models';
import { BaseEditComponent } from '../../base/base.edit.component';

@Component({
    templateUrl: './dealer.edit.component.html',
    selector: 'dealer-edit'
})

export class  DealerEditComponent extends BaseEditComponent implements OnInit {

    dealerForm: FormGroup;
    record: any = null;
    dealer_tiers: any = [];
    dealer_types_lookup_endpoint: string = "dealer_types";
    dealer_services_lookup_endpoint: string = "dealer_services";
    dealer_maintenances_lookup_endpoint: string = "dealer_maintenances";
    locationSettings: any = {};
    selectedAddress: any = {};
    @Input() id: any = null;
    @Output() close = new EventEmitter();

    constructor(
        private router: Router,
        private dealerService: DealerService,
        private formBuilder: FormBuilder,
        private lookupService: LookupService,
        protected pluginService: PluginService,
        protected alertService: AlertService
    ) {
        super(pluginService);
    }

    ngOnInit() {
        this.dealerForm = this.formBuilder.group({
            name: ['', Validators.required],
            account_number: ['', Validators.required],
            phone: [''],
            fax: [''],
            email: [''],
            address: [''],
            website: [''],
            tier_id: ['', Validators.required],
            logo_image_url: [''],
            dealer_type_ids: [''],
            dealer_service_ids: [''],
            dealer_maintenance_ids: [''],
            sub_address: [''],
            enabled: [''],
            factory_trained: [''],
            show_opening_hours: [''],
            mon_close: [''],
            mon_open_time: [''],
            mon_close_time: [''],
            tue_close: [''],
            tue_open_time: [''],
            tue_close_time: [''],
            wed_close: [''],
            wed_open_time: [''],
            wed_close_time: [''],
            thu_close: [''],
            thu_open_time: [''],
            thu_close_time: [''],
            fri_close: [''],
            fri_open_time: [''],
            fri_close_time: [''],
            sat_close: [''],
            sat_open_time: [''],
            sat_close_time: [''],
            sun_close: [''],
            sun_open_time: [''],
            sun_close_time: [''],

        });

        this.lookupService.getAll("dealer_tiers")
            .subscribe(
                data => {
                    this.dealer_tiers = data.data;
                },
                error => {
                    this.handleError(error, this.dealerForm);
                });

        if (this.id != 'new') {
            this.dealerService.getRecord(this.id)
                .subscribe(
                    data => {
                        this.record = data.data;
                        this.locationSettings['inputString'] = this.record.address;
                        this.selectedAddress.address = this.record.address;
                    },
                    error => {
                        this.handleError(error, this.dealerForm);
                    });
        } else {
            this.record = {
                dealer_type_ids :  {"data": []},
                dealer_service_ids :  {"data": []},
                dealer_maintenance_ids :  {"data": []}
            };
        }

        this.locationSettings = {
            'showCurrentLocation': false,
            'showRecentSearch': false,
            'showSearchButton': false,
            'inputPlaceholderText': 'Please enter your suburb',
            'geoCountryRestriction': ['AU','NZ']
        }
    }

    cancel() {
        this.close.emit();
    }

    save() {
        let service_ids =  this.record.dealer_service_ids;
        let type_ids =  this.record.dealer_type_ids;
        let maintenance_ids =  this.record.dealer_maintenance_ids;
        this.record = this.dealerForm.value;

        // update, id and auto complete values
        this.record.id = this.id;
        this.record.dealer_service_ids = service_ids;
        this.record.dealer_type_ids = type_ids;
        this.record.dealer_maintenance_ids = maintenance_ids;

        // update address components
        Object.keys(this.selectedAddress).map((key) => { this.record[key] = this.selectedAddress[key] });
        
        if (this.id != 'new') {
            this.dealerService.save(this.record)
            .subscribe(
                data => {
                    this.record = data.data;
                },
                error => {
                    this.handleError(error, this.dealerForm);
                });
        } else {
            this.dealerService.create(this.record)
            .subscribe(
                data => {
                    this.id = data.data.id;
                    this.record = data.data;
                    this.router.navigate(['/dealers/' + data.data.id]);
                },
                error => {
                    this.handleError(error, this.dealerForm);
                });
        }
    }

    autoCompleteCallback(event) {
        console.log(event);
        if (event.data) {
            this.selectedAddress.address = event.data.formatted_address;
            this.selectedAddress.latitude = event.data.geometry.location.lat;
            this.selectedAddress.longitude = event.data.geometry.location.lng;
            this.selectedAddress.suburb = this.extractAddressPart(/<span class="locality">(.*?)<\/span>/g, event.data.adr_address);
            this.selectedAddress.state = this.extractAddressPart(/<span class="region">(.*?)<\/span>/g, event.data.adr_address);
            this.selectedAddress.postcode = this.extractAddressPart(/<span class="postal-code">(.*?)<\/span>/g, event.data.adr_address);
            this.selectedAddress.country = this.extractAddressPart(/<span class="country-name">(.*?)<\/span>/g, event.data.adr_address);
            console.log(this.selectedAddress);
        }
    }

    private extractAddressPart(regex, data) {
        var matches = regex.exec(data);
        return (matches && matches[1] != undefined) ? matches[1] : "";
    }
}
