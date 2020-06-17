
import { Renderer2, ElementRef, ViewChild, Injector } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import { Location } from '@angular/common';
import { AuthenticationService } from 'src/app/services';
import { environment } from '../../../environments/environment';

export class BaseListComponent {

    protected dtOptions: DataTables.Settings = {}
    protected dtTrigger: Subject<any> = new Subject();
    protected listenerFn: any = null;
    protected records: any[] = null;
    protected record_id: any = false;
    protected mode: any = 'list';
    protected renderer: Renderer2;
    protected elementRef: ElementRef;
    protected location: Location;
    
    protected authenticationService: AuthenticationService;
    
    @ViewChild(DataTableDirective) grid: DataTableDirective;

    constructor(
        
        protected service: any,
        protected injector: Injector,
        protected type: string
    ) {
        this.renderer = injector.get(Renderer2);
        this.elementRef = injector.get(ElementRef);
        this.location = injector.get(Location);
        this.authenticationService = injector.get(AuthenticationService);
    }

    /**
     * 
     * Function to override for dialog action
     */
    openDialog(id: any): void { };

    fromUtc(input: string) {
        if (input) {
            var date = new Date(input + ' UTC');
            return date;
        } else {
            return input;
        }
    }

    getAjaxConfig(entity: string) {
        let currentUser = this.authenticationService.currentUserValue;
        return {
            "url": `${environment.apiUrl}/admin/` + entity,
            "dataType": 'json',
            "type": "GET",
            "beforeSend": function(xhr){
               xhr.setRequestHeader("Authorization", `Bearer ${currentUser.access_token}`)
            }
        };
    }

    clearListeners() {
        if (this.listenerFn) {
            this.listenerFn();
        }
    }

    bindListeners() {
        this.listenerFn = this.renderer.listen(this.elementRef.nativeElement, 'click', (event: any) => {

            if (event.target.hasAttribute("modal-record-id")) {
                this.openDialog(event.target.getAttribute("modal-record-id"));

            } else if (event.target.hasAttribute("edit-record-id")) {
                this.mode = 'edit';
                this.clearListeners();
                this.record_id = event.target.getAttribute("edit-record-id");
                this.location.replaceState("/" + this.type + "/" + event.target.getAttribute("edit-record-id"));

            } else if (event.target.hasAttribute("delete-record-id")) {

                if (confirm("Are you sure want to delete this record?")) {

                    this.service.delete(event.target.getAttribute("delete-record-id"))
                        .subscribe((data) => {
                            this.reload();
                        },(error) => {
                        });
                }

            } else if (event.target.hasAttribute("duplicate-record-id")) {

                if (confirm("Are you sure want to duplicate this record?")) {

                    this.service.duplicate(event.target.getAttribute("duplicate-record-id"))
                        .subscribe((data) => {
                            this.reload();
                        },(error) => {
                        });
                }

            } else if (event.target.hasAttribute("toggle-record-id")) {

                if (event.target.checked) {

                    this.service.enable(event.target.getAttribute("toggle-record-id"))
                        .subscribe((data) => {
                            event.target.checked = true;
                        }, (error) => {
                            event.target.checked = false;
                        });

                } else {

                    this.service.disable(event.target.getAttribute("toggle-record-id"))
                        .subscribe((data) => {
                            event.target.checked = false;
                        }, (error) => {
                            event.target.checked = true;
                        });
                }

            } else if (event.target.hasAttribute("feature-record-id")) {

                if (event.target.checked) {

                    this.service.featured(event.target.getAttribute("feature-record-id"), 'enable')
                        .subscribe((data) => {
                            event.target.checked = true;
                        }, (error) => {
                            event.target.checked = false;
                        });

                } else {

                    this.service.featured(event.target.getAttribute("feature-record-id"), 'disable')
                        .subscribe((data) => {
                            event.target.checked = false;
                        }, (error) => {
                            event.target.checked = true;
                        });
                }
            }
        });
    }
    close() {
        this.mode = 'none';
        this.record_id = false;
        let self = this;
        setTimeout(function () {
            self.mode = 'list';
            self.clearListeners();
            self.bindListeners();
        }, 100)
        this.location.replaceState("/" + this.type);
        this.reload();
    }

    reload() {
        this.grid.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.ajax.reload();
        });
    }
}