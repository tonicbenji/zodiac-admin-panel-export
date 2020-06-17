import { Component, OnInit, Injector } from '@angular/core';
import { UserService } from '../../../services/models';
import { ActivatedRoute } from '@angular/router';
import { BaseListComponent } from '../../base/base.list.component';

@Component({
    templateUrl: './users.component.html'
})

export class  UsersComponent extends BaseListComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        public injector: Injector
    ) {
        super(userService, injector, 'users');
        let id = this.route.snapshot.paramMap.get('id');
        if (id) {
            this.record_id = id;
            this.mode = 'edit';
        }
    }

    ngOnInit(): void {
        this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 25,
            ajax: this.getAjaxConfig('users'),
            "columns": [
              {
                  data: "first_name",
                  title: "First Name"
              },
              {
                  data: "last_name",
                  title: "Last Name"
              },
              {
                  data: "email",
                  title: "Email"
              },
              {
                  data: "created_at",
                  title: "Created"
              },
              {
                  data: "updated_at",
                  title: "Updated"
              },
              {
                  data: "id",
                  title: "ID",
                  visible: false
              },
              {
                data: "can_delete",
                title: "Can Delete",
                visible: false
              },
              {
                  title: 'Action',
                  orderable: false,
                  render: function (data: any, type: any, full: any) {
                      if (full.can_delete == 1) {
                        return '<a edit-record-id="' + full.id + '" class="btn btn-primary">Edit</a>&nbsp;&nbsp;<a delete-record-id="' + full.id + '" class="btn btn-danger">Delete</a>';
                      } else {
                        return '<a edit-record-id="' + full.id + '" class="btn btn-primary">Edit</a>';
                      }
                  }
              }
            ]
        };
    }
    ngAfterViewInit(): void {
        this.bindListeners();
    }
    ngOnDestroy() {
        this.clearListeners();
    }
    addUser() {
        this.record_id = 'new';
        this.mode = 'edit';
    }
}
