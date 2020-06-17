import { Component, OnInit, Inject, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PluginService, AlertService } from '../../../services';
import { CategoryService, LookupService } from '../../../services/models';
import { first } from 'rxjs/operators';
import { BaseEditComponent } from '../../base/base.edit.component';

@Component({
    templateUrl: './categories.edit.component.html',
    selector: 'categories-edit'
})

export class  CategoriesEditComponent extends BaseEditComponent implements OnInit {

    categoriesForm: FormGroup;
    record: any = null;
    categories: any = [];
    zones: any = [];
    @Input() id: any = null;
    @Output() close = new EventEmitter();

    constructor(
        private router: Router,
        private categoryService: CategoryService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private lookupService: LookupService,
        protected pluginService: PluginService,
        protected alertService: AlertService
    ) {
        super(pluginService);
    }

    ngOnInit() {
        this.categoriesForm = this.formBuilder.group({
            name: ['', Validators.required],
            short_name: [''],
            slug: ['', Validators.compose([Validators.required])],
            parent_id: ['', Validators.required],
            order: [''],
            enabled: [''],
            blurb: [''],
            description: [''],
            meta_title: [''],
            meta_description: [''],
            meta_image: [''],
            main_image_url: [''],
            list_image_url: [''],
            home_image_url: [''],
            header_image_url: [''],
            zone: ['']
        });

        this.lookupService.getAll("categories")
            .subscribe(
                data => {
                    this.categories = data.data;
                },
                error => {
                    this.handleError(error, this.categoriesForm);
                });
        this.lookupService.getAll("zones")
            .subscribe(
                data => {
                    this.zones = data.data;
                },
                error => {
                    this.handleError(error, this.categoriesForm);
                });

        if (this.id != 'new') {
            this.categoryService.getRecord(this.id)
                .subscribe(
                    data => {
                        this.record = data.data;
                    },
                    error => {
                        this.handleError(error, this.categoriesForm);
                    });
        } else {
            this.record = {};
        }
    }

    ngAfterViewInit() {

    }

    cancel() {
        this.close.emit();
    }

    save() {
        this.record = this.categoriesForm.value;
        this.record.id = this.id;
        if (this.id != 'new') {
            this.categoryService.save(this.record)
            .subscribe(
                data => {
                    this.record = data.data;
                },
                error => {
                    this.handleError(error, this.categoriesForm);
                });
        } else {
            this.categoryService.create(this.record)
            .subscribe(
                data => {
                    this.id = data.data.id;
                    this.record = data.data;
                    this.router.navigate(['/products/' + data.data.id]);
                },
                error => {
                    this.handleError(error, this.categoriesForm);
                });
        }
    }

    nameChange() {
        if (this.id == 'new') {
            this.record.slug = this.string_to_slug(this.record.name);
        }
    }

}
