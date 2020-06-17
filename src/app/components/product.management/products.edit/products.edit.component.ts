import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PluginService, AlertService } from '../../../services';
import { ProductService, LookupService } from '../../../services/models';
import { BaseEditComponent } from '../../base/base.edit.component';

@Component({
    templateUrl: './products.edit.component.html',
    selector: 'products-edit'
})

export class  ProductsEditComponent extends BaseEditComponent implements OnInit {

    productForm: FormGroup;
    record: any = null;
    categories: any = [];
    zones:any = [];
    products_lookup_endpoint: string = "products";
    @Input() id: any = null;
    @Output() close = new EventEmitter();

    constructor(
        private router: Router,
        private productService: ProductService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private lookupService: LookupService,
        protected pluginService: PluginService,
        protected alertService: AlertService,
    ) {
        super(pluginService);
    }

    ngOnInit() {
        this.productForm = this.formBuilder.group({
            name: ['', Validators.required],
            short_name: [''],
            slug: ['', Validators.compose([Validators.required])],
            category_id: ['', Validators.required],
            tag_line: [''],
            points: [''],
            order: [''],
            enabled: [''],
            discontinued: [''],
            featured: [''],
            blurb: [''],
            description: [''],
            meta_title: [''],
            meta_description: [''],
            meta_image: [''],
            assist_meta_title: [''],
            assist_meta_description: [''],
            assist_meta_image: [''],
            main_image_url: [''],
            list_image_url: [''],
            main_video_url: [''],
            main_video_id: [''],
            related_products: [],
            zone: [''],
            warranty_able: [''],
            salesforce_id: ['']
        });

        this.lookupService.getAll("categories")
            .subscribe(
                data => {
                    this.categories = data.data;
                },
                error => {
                    this.handleError(error, this.productForm);
                });
        
        this.lookupService.getAll("zones")
            .subscribe(
                data => {
                    this.zones = data.data;
                },
                error => {
                    this.handleError(error, this.productForm);
                });

        if (this.id != 'new') {
            this.productService.getRecord(this.id)
                .subscribe(
                    data => {
                        this.record = data.data;
                    },
                    error => {
                        this.handleError(error, this.productForm);
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

        this.record = this.productForm.value;
        this.record.id = this.id;
        this.record.related_products = product_ids;
        
        if (this.id != 'new') {
            this.productService.save(this.record)
            .subscribe(
                data => {
                    this.record = data.data;
                },
                error => {
                    this.handleError(error, this.productForm);
                });
        } else {
            this.productService.create(this.record)
            .subscribe(
                data => {
                    this.id = data.data.id;
                    this.record = data.data;
                    this.router.navigate(['/products/' + data.data.id]);
                },
                error => {
                    this.handleError(error, this.productForm);
                });
        }
    }

    nameChange() {
        if (this.id == 'new') {
            this.record.slug = this.string_to_slug(this.record.name);
        }
    }

}
