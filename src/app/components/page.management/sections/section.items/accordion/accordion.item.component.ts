import { Component, Input, OnInit } from '@angular/core';
import { AccordionItem } from 'src/app/models';
import { DynamicComponent } from 'src/app/components/base/dynamic.component';
import { PluginService } from 'src/app/services';

@Component({
    selector: 'accordion-item-component',
    templateUrl: 'accordion.item.component.html'
})
export class AccordionSectionItemComponent extends DynamicComponent implements OnInit {

    constructor(public pluginService: PluginService) {
        super(pluginService);
    }

    @Input() item: AccordionItem;

    @Input() onDelete: Function;

    ngOnInit() {
    }
}