import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { LookupService } from 'src/app/services/models';
@Component({
    selector: 'autocomplete',
    templateUrl: './autocomplete.component.html',
    styleUrls: ['autocomplete.component.less']
})
export class AutoCompleteComponent implements OnInit {
    
    lookup_text: string;

    filteredLookups: Array<any> = [];

    selected_items:  Array<any> = [];

    lookup_items: Array<any> = [];

    @Input() lookup_endpoint: string;

    @Input() selected_ids: any = {"data": []};

    @Input() restrict?: any;

    timer: any;

    focus_item: number = -1;

    @ViewChild("lookup_list") lookup_list_field: ElementRef;

    @ViewChild("lookup_text_field") lookup_text_field: ElementRef;

    constructor(protected lookupService: LookupService

    ) {}

    ngOnInit(){
        this.selected_ids.data = this.selected_ids.data.map((item) => {
            return parseInt(item);
        });
        this.lookupService.getAll(this.lookup_endpoint)
            .subscribe(
                data => {
                    this.lookup_items = data.data;
                    this.lookup_items.filter(item => {
                        if (this.selected_ids.data.indexOf(item.id) > -1) {
                            this.selected_items.push(item);
                        }
                        return false;
                    });
                    this.applyRestrict();
                },
                error => {
                    this.lookup_items = [];
                });
    }
    
    filterLookups(e) {
        if (e.keyCode == 38) {
            this.focus_item = this.focus_item - 1;
            if (this.focus_item < 0) {
                this.focus_item = 0;
            }
            this.lookup_list_field.nativeElement.children[this.focus_item].scrollIntoView({ behavior: 'smooth' });
            
        } else if (e.keyCode == 40) {
            this.focus_item = this.focus_item + 1;
            if (this.focus_item > this.filteredLookups.length - 1) {
                this.focus_item = this.filteredLookups.length - 1;
            }
            this.lookup_list_field.nativeElement.children[this.focus_item].scrollIntoView({ behavior: 'smooth' });
        
        } else if (e.keyCode == 13) {
            if (this.focus_item > -1) {
                this.selectItem(this.filteredLookups[this.focus_item]);
            }
        
        } else {
            this.focus_item = 0;
            this.filteredLookups = this.lookup_items.filter(item => {
                if (this.selected_ids.data.indexOf(item.id) == -1) {
                    return item.name.toLowerCase().includes(this.lookup_text.toLowerCase());
                }
                return false;
            });
            if (this.lookup_list_field && this.lookup_list_field.nativeElement) {
                this.lookup_list_field.nativeElement.children[this.focus_item].scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    selectItem(item) {
        if (this.restrict && this.selected_items.length >= this.restrict) {
            this.filteredLookups = [];
            return;
        }
        this.selected_items.push(item);
        this.selected_ids.data.push(item.id);
        this.filteredLookups = [];
        this.lookup_text = "";
        this.focus_item = -1;

        this.applyRestrict();
    }

    removeItem(item) {
        for (let index = 0; index < this.selected_items.length; index++) {
            if (item.id == this.selected_items[index].id) {
                this.selected_items.splice(index, 1);
            }
        }
        const index = this.selected_ids.data.indexOf(item.id);
        if (index > -1) {
            this.selected_ids.data.splice(index, 1);
        }

        this.applyRestrict();
    }

    enterList() {
        clearTimeout(this.timer);
    }

    leaveList() {
        this.timer = setTimeout(() => {
            this.filteredLookups = [];
        }, 1000);
    }
    enterItem(i) {
        this.focus_item = i;
    }

    applyRestrict() {
        if (this.restrict && this.selected_items.length >= this.restrict) {
            this.lookup_text_field.nativeElement.disabled = true;
        } else {
            this.lookup_text_field.nativeElement.disabled = false;
        }
    }
}
