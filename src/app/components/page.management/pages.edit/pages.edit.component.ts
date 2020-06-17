import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PluginService, AlertService } from '../../../services';
import { PageService, PageSectionService, LookupService } from '../../../services/models';
import { BaseEditComponent } from '../../base/base.edit.component';
import { Section } from '../../../models/section';

@Component({
    templateUrl: './pages.edit.component.html',
    selector: 'pages-edit'
})

export class  PagesEditComponent extends BaseEditComponent implements OnInit {

    pagesForm: FormGroup;
    record: any = null;
    type: string = '';
    categories: any = [];
    zones: any = [];
    products_lookup_endpoint: string = "products";
    section_types: any = [];
    banner_types: any = [];

    @Input() id: any = null;
    @Input() entity: string = null;
    @Output() close = new EventEmitter();

    constructor(
        private router: Router,
        private pageService: PageService,
        private sectionService: PageSectionService,
        private formBuilder: FormBuilder,
        protected pluginService: PluginService,
        protected alertService: AlertService,
        protected lookupService: LookupService
    ) { 
        super(pluginService);
    }

    ngOnInit() {
        this.type = this.pageService.getType();
        this.pagesForm = this.formBuilder.group({
            name: ['', Validators.required],
            slug: ['', Validators.required],
            enabled: [''],
            meta_title: [''],
            meta_description: [''],
            meta_image: [''],
            list_image_url: [''],
            blurb: [''],
            category: ['', Validators.required],
            related_entity_id: [''],
            zone: [''],
        });

		this.lookupService.getAll("section_types")
			.subscribe(
				data => {
						if(this.type == 'microsites')
                        this.section_types = data.data;
                        else
                        this.section_types = data.data.filter(item => (item.id < 15 || item.id == 23 || item.id == 24));
				},
				error => {
                });
        
        setTimeout(()=>{
        this.lookupService.getAll("banner_types")
            .subscribe(
                data => {                        
                        this.banner_types = data.data;                        
                },
                error => {
                });
        });
                
        this.lookupService.getAll("page_categories/" + this.type)
            .subscribe(
                data => {
                    this.categories = data.data;
                },
                error => {
                    this.handleError(error, this.pagesForm);
                });
        
        this.lookupService.getAll("zones")
            .subscribe(
                data => {
                    this.zones = data.data;
                },
                error => {
                    this.handleError(error, this.pagesForm);
                });

        if (this.id != 'new') {
            this.pageService.getRecord(this.id)
                .subscribe(
                    data => {
                        this.record = data.data;
                    },
                    error => {
                        this.record = {};
                        this.handleError(error, this.pagesForm);
                    });
        } else {
            this.record = {
                "related_entity_id": {"data": []},
                "sections": []
            };
        }
    }

    cancel() {
        this.close.emit();
    }

    save() {
        let related_entity_id =  this.record.related_entity_id;
        if (this.validateSections()) {
            if(this.type == 'assistance') this.record.type = 'assistance';

            if (this.id != 'new') {
                this.pageService.save(this.record)
                    .subscribe(
                        data => {
                            this.record = data.data;
                        },
                        error => {
                            this.handleError(error, this.pagesForm);
                        });
            
            } else {
                this.pageService.create(this.record)
                    .subscribe(
                        data => {
                            this.id = data.data.id;
                            this.record = data.data;
                            this.router.navigate(['/' + this.type + '/' + data.data.id]);
                        },
                        error => {
                            this.handleError(error, this.pagesForm);
                        });
            }
        }
    }
    validateSections() {
        let valid = true;
        if (this.record.sections) {
            for (let index = 0; index < this.record.sections.length; index++) {
                let section = new Section(this.id, this.record.sections[index]);
                let result = section.validate();
                this.record.sections[index] = section;
                // TODO: crawl thrown items
                if (!result) {

                    valid = false;
                }
            }
        }
        return valid;
    }

    nameChange() {
        if (this.id == 'new') {
            this.record.slug = this.string_to_slug(this.record.name);
        }
    }

    deleteSection(index) {
        if (confirm("Are you sure want to delete this section? Please note this will also delete all child items if any")) {
            this.record.sections.splice(index, 1);
        }
    }

    addSection() {
        let section = new Section(this.id);
        section.order = this.record.sections.length;
        this.record.sections.push(section);
    }

    orderedSections() {
        return this.record.sections.sort(function(a,b){
            return (a.order == b.order) ? 0 : a.order > b.order ? 1 : -1;
        });
    }

    moveSectionUp(i) {
        for (let index = 0; index < this.record.sections.length; index++) {
            if (index == i) {
                this.record.sections[index].order = index - 1;
            } else if (index == i - 1) {
                this.record.sections[index].order = index + 1;
            } else {
                this.record.sections[index].order = index;
            }
        }
    }
    moveSectionDown(i) {
        for (let index = 0; index < this.record.sections.length; index++) {
            if (index == i) {
                this.record.sections[index].order = index + 1;
            } else if (index == i + 1) {
                this.record.sections[index].order = index - 1;
            } else {
                this.record.sections[index].order = index;
            }
        }
    }
}
