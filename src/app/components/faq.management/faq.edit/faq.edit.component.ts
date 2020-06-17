import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PluginService, AlertService } from '../../../services';
import { FaqService, LookupService } from '../../../services/models';
import { BaseEditComponent } from '../../base/base.edit.component';

@Component({
    templateUrl: './faq.edit.component.html',
    selector: 'faq-edit'
})

export class  FaqEditComponent extends BaseEditComponent implements OnInit {

    faqForm: FormGroup;
    record: any = null;
    categories: any = [];
    @Input() id: any = null;
    @Output() close = new EventEmitter();

    constructor(
        private router: Router,
        private faqService: FaqService,
        private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private lookupService: LookupService,
        protected pluginService: PluginService,
        protected alertService: AlertService
    ) {
        super(pluginService);
    }

    ngOnInit() {
        this.faqForm = this.formBuilder.group({
            question: ['', Validators.required],
            answer: ['', Validators.required],
            category_id: ['', Validators.required]
        });

        this.lookupService.getAll("faq_categories")
            .subscribe(
                data => {
                    this.categories = data.data;
                },
                error => {
                    this.handleError(error, this.faqForm);
                });

        if (this.id != 'new') {
            this.faqService.getRecord(this.id)
                .subscribe(
                    data => {
                        this.record = data.data;
                    },
                    error => {
                        this.handleError(error, this.faqForm);
                    });
        } else {
            this.record = {};
        }
    }

    cancel() {
        this.close.emit();
    }

    save() {
        this.record = this.faqForm.value;
        this.record.id = this.id;
        if (this.id != 'new') {
            this.faqService.save(this.record)
            .subscribe(
                data => {
                    this.record = data.data;
                },
                error => {
                    this.handleError(error, this.faqForm);
                });
        } else {
            this.faqService.create(this.record)
            .subscribe(
                data => {
                    this.id = data.data.id;
                    this.record = data.data;
                    this.router.navigate(['/faq/' + data.data.id]);
                },
                error => {
                    this.handleError(error, this.faqForm);
                });
        }
    }

    nameChange() {
        if (this.id == 'new') {
            this.record.slug = this.string_to_slug(this.record.name);
        }
    }

}
