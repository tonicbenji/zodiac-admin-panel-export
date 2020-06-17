
import { Component, ViewChild, Input, Output, EventEmitter, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { SliderSectionItemComponent } from './section.items/slider/slider.item.component';
import { Section, SliderItem, TenStepItem, AccordionItem } from '../../../models';
import { PluginService } from 'src/app/services';
import { DynamicComponent } from '../../base/dynamic.component';
import { PageSectionItemService, LookupService } from 'src/app/services/models';
import { TenStepSectionItemComponent } from './section.items/ten_step/ten_step.item.component';
import { AccordionSectionItemComponent } from './section.items/accordion/accordion.item.component';

@Component({
    selector: 'section-component',
    templateUrl: './section.component.html'
})
export class SectionComponent extends DynamicComponent {

    @Input() section: Section;
    @Input() section_types: Array<any> = [];
    @Input() banner_types: Array<any> = [];
    @Output() delete = new EventEmitter();
    @Output() moveUp = new EventEmitter();
    @Output() moveDown = new EventEmitter();
    @ViewChild('sectionitems', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef;

    products_lookup_endpoint: string = "products";

    poolspa_guides_lookup_endpoint: string = "poolspa_guides";

    constructor(
        public factoryResolver: ComponentFactoryResolver,
        public pluginService: PluginService,
        public itemService: PageSectionItemService,
        public lookupService: LookupService
    ) {
        super(pluginService);
    }

    ngOnInit() {
        if (!this.section.field_1 && (this.section.section_type=='Guides List' || this.section.section_type == 'Products List' || this.section.section_type=='Micro Site Featured Products')) {
            this.section.field_1 = {
                "data": []
            };
        }
    }

    makeSectionItem(section_item: any = null) {
        let attributes = null;
        if (section_item) {
            attributes = section_item;
        }
        if (this.section.section_type == 'Slider') {
            return new SliderItem(this.section.id, attributes);
        } else if (this.section.section_type == 'Ten Steps') {
            return new TenStepItem(this.section.id, attributes);
        } else if (this.section.section_type == 'Micro Site Introduction' || this.section.section_type == 'Micro Site Content 1' || this.section.section_type == 'Micro Site Content 2' || this.section.section_type=='Micro Site Features') {
            return new TenStepItem(this.section.id, attributes);
        } else if (this.section.section_type == 'Accordion') {
            return new AccordionItem(this.section.id, attributes);
        } else {
            return null;
        }
    }

    getItemComponentClass() {
        if (this.section.section_type == 'Slider') {
            return SliderSectionItemComponent;
        } else if (this.section.section_type == 'Ten Steps') {
            return TenStepSectionItemComponent;
        } else if (this.section.section_type == 'Accordion') {
            return AccordionSectionItemComponent;
        } else {
            return null;
        }
    }

    addSectionItem() {
        this.section.items.push(this.makeSectionItem());
    }

    deleteItem(index) {
        if (confirm("Are you sure want to delete this item?")) {
            this.section.items.splice(index, 1);
        }
    }

    updateSectionType() {
        for (let index = 0; index < this.section_types.length; index++) {
            const section_type = this.section_types[index];
            if (section_type.id == this.section.section_type_id) {
                this.section.section_type = section_type.name;
            }
        }
        if (!this.section.field_1 && (this.section.section_type=='Guides List' || this.section.section_type == 'Products List' || this.section.section_type=='Micro Site Featured Products')) {
            this.section.field_1 = {
                "data": []
            };
        }
    }

}