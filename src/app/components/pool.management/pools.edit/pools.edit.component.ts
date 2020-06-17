
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PluginService, AlertService } from '../../../services';
import { PoolService, LookupService } from '../../../services/models';
import { BaseEditComponent } from '../../base/base.edit.component';

@Component({
    templateUrl: './pools.edit.component.html',
    selector: 'pools-edit'
})

export class PoolsEditComponent extends BaseEditComponent implements OnInit {

    poolForm: FormGroup;
    record: any = null;
    pool_styles:any[] = [];
    builders: any[] = [];
    zones: any[] = [];
    products_lookup_endpoint: string = "products";
    @Input() id: any = null;
    @Output() close = new EventEmitter();

    constructor(
        private router: Router,
        private poolService: PoolService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private lookupService: LookupService,
        protected pluginService: PluginService,
        protected alertService: AlertService,
        
    ) { 
        super(pluginService);
    }

    ngOnInit() {
        this.poolForm = this.formBuilder.group({
            name: ['', Validators.required],
            slug: ['', Validators.compose([Validators.required])],
            pool_style_id: ['', Validators.required],
            order: [''],
            enabled: [''],
            featured: [''],
            blurb: [''],
            description: [''],
            location: [''],
            construction: [''],
            length: [''],
            width: [''],
            min_depth: [''],
            max_depth: [''],
            builder_id: [''],
            meta_title: [''],
            meta_description: [''],
            meta_image: [''],
            main_image_url: [''],
            list_image_url: [''],
            related_products: [],
            zone: [''],
        });

        this.lookupService.getAll("pool_styles")
            .subscribe(
                data => {
                    this.pool_styles = data.data;
                },
                error => {
                    this.handleError(error, this.poolForm);
                });
        
        this.lookupService.getAll("builders")
                .subscribe(
                    data => {
                        this.builders = data.data;
                    },
                    error => {
                        this.handleError(error, this.poolForm);
                    });
        
        this.lookupService.getAll("zones")
                .subscribe(
                    data => {
                        this.zones = data.data;
                    },
                    error => {
                        this.handleError(error, this.poolForm);
                    });

        if (this.id != 'new') {
            this.poolService.getRecord(this.id)
                .subscribe(
                    data => {
                        this.record = data.data;
                    },
                    error => {
                        this.record = {};
                        this.handleError(error, this.poolForm);
                    });
        } else {
            this.record = {
                "related_products": {"data": []}
            };
        }
    }

    cancel() {
        this.close.emit();
    }

    save() {
        let product_ids =  this.record.related_products;
        
        this.record = this.poolForm.value;
        this.record.id = this.id;
        this.record.related_products = product_ids;

        if (this.id != 'new') {
            this.poolService.save(this.record)
            .subscribe(
                data => {
                    this.record = data.data;
                },
                error => {
                    this.handleError(error, this.poolForm);
                });
        } else {
            this.poolService.create(this.record)
            .subscribe(
                data => {
                    this.id = data.data.id;
                    this.record = data.data;
                    this.router.navigate(['/pools/' + data.data.id]);
                },
                error => {
                    this.handleError(error, this.poolForm);
                });
        }
    }
    
    nameChange() {
        if (this.id == 'new') {
            this.record.slug = this.string_to_slug(this.record.name);
        }
    }
}
