import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SliderItem } from 'src/app/models';
import { DynamicComponent } from 'src/app/components/base/dynamic.component';
import { PluginService } from 'src/app/services';

@Component({
    selector: 'slider-item-component',
    templateUrl: 'slider.item.component.html'
})
export class SliderSectionItemComponent extends DynamicComponent implements OnInit {

    constructor(public pluginService: PluginService) {
        super(pluginService);
    }

    @Input() item: SliderItem;
    
    @Output() delete = new EventEmitter();

    ngOnInit() {
    }
}