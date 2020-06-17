import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PluginService, AlertService } from '../../../services';
import { BookGroupService, LookupService } from '../../../services/models';
import { BaseEditComponent } from '../../base/base.edit.component';

@Component({
    templateUrl: './bookgroup.edit.component.html',
    selector: 'bookgroup-edit'
})

export class  BookGroupEditComponent extends BaseEditComponent implements OnInit {

    bookGroupForm: FormGroup;
    record: any = null;
    zones:any = [];
    products_lookup_endpoint: string = "products";
    dealers_lookup_endpoint: string = "dealers";

    @Input() id: any = null;
    @Output() close = new EventEmitter();

    constructor(
        private router: Router,
        private bookgroupService: BookGroupService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private lookupService: LookupService,
        protected pluginService: PluginService,
        protected alertService: AlertService,
    ) {
        super(pluginService);
    }

    ngOnInit() {
        this.bookGroupForm = this.formBuilder.group({
            name: [''],
            desc: [''],
            enabled: [''],
            zone: [''],
            dealer_ids : [''],
            product_ids : [''],
        });

        
        this.lookupService.getAll("zones")
            .subscribe(
                data => {
                    this.zones = data.data;
                },
                error => {
                    this.handleError(error, this.bookGroupForm);
                });        

        if (this.id != 'new') {
            this.bookgroupService.getRecord(this.id)
                .subscribe(
                    data => {
                        this.record = data.data;
                    },
                    error => {
                        this.handleError(error, this.bookGroupForm);
                    });
        } else {
            this.record = { 
                "dealer_ids": {"data": []},               
                "product_ids": {"data": []},
            };
        }
    }

    cancel() {
        this.close.emit();
    }

    save() {
        let dealer_ids =  this.record.dealer_ids;
        let product_ids =  this.record.product_ids;

        this.record = this.bookGroupForm.value;
        this.record.id = this.id;
        this.record.dealer_ids = dealer_ids;
        this.record.product_ids = product_ids;
        
        if (this.id != 'new') {
            this.bookgroupService.save(this.record)
            .subscribe(
                data => {
                    this.record = data.data;
                },
                error => {
                    this.handleError(error, this.bookGroupForm);
                });
        } else {
            this.bookgroupService.create(this.record)
            .subscribe(
                data => {
                    this.id = data.data.id;
                    this.record = data.data;
                    this.router.navigate(['/bookgroups/' + data.data.id]);
                },
                error => {
                    this.handleError(error, this.bookGroupForm);
                });
        }
    }
   
}
