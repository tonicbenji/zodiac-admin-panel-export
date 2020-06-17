import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WarrantyService, LookupService } from '../../../services/models';
import { BaseListComponent } from '../../base/base.list.component';

@Component({
    templateUrl: './assistant.component.html'
})

export class  AssistantComponent extends BaseListComponent implements OnInit {
    
    result: string = '';

    constructor(
        private route: ActivatedRoute,
        private warrantyService: WarrantyService,
        private lookupService: LookupService,
        protected injector: Injector,
    ) { 
        super(warrantyService, injector, 'warranties');       
    }
    
    ngOnInit() {

    }
    ngAfterViewInit(): void {
        this.bindListeners();
    }
    ngOnDestroy() {
        this.clearListeners();
    }

    runCommand($id) {
         
         this.lookupService.getAll("assistant_commands/" + $id)                
                .subscribe(
                    data => { 
                    console.log(data);
                    },
                    error => {                       
                    console.log(error);
                    });
        
    }

}
