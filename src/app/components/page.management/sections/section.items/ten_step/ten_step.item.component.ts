import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TenStepItem } from 'src/app/models';
import { DynamicComponent } from 'src/app/components/base/dynamic.component';
import { PluginService } from 'src/app/services';

@Component({
    selector: 'tenstep-item-component',
    templateUrl: 'ten_step.item.component.html'
})
export class TenStepSectionItemComponent extends DynamicComponent implements OnInit {

    constructor(public pluginService: PluginService) {
        super(pluginService);
    }

    @Input() item: TenStepItem;
    
    @Output() delete = new EventEmitter();

    ngOnInit() {
    }
}