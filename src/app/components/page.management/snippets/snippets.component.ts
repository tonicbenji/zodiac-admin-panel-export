import { Component, OnInit, Injector } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SnippetService } from '../../../services/models';
import { BaseListComponent } from '../../base/base.list.component';

@Component({
  selector: 'app-snippets',
  templateUrl: './snippets.component.html',
  styleUrls: ['./snippets.component.less']
})
export class SnippetsComponent extends BaseListComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private snippetService: SnippetService,
    protected injector: Injector

  ) {

    super(snippetService, injector, 'snippets');

    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.record_id = id;
      this.mode = 'edit';
    }


    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      ajax: this.getAjaxConfig('snippets'),
      "columns": [
        {
          data: "id",
          title: "ID",
          visible: false
        },
        {
          data: "title",
          title: "Title"
        },
        {
          data: "key",
          title: "Key"
        },
      
      
        {
          data: "updated_at",
          title: "Updated"
        },
    
        {
          title: 'Action',
          orderable: false,
          render: function (data: any, type: any, full: any) {
            return '<a edit-record-id="' + full.id + '" class="btn btn-primary">Edit</a>&nbsp;&nbsp;<a delete-record-id="' + full.id + '" class="btn btn-danger">Delete</a>';
          }
        }
      ]
    }

  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.bindListeners();
  }
  ngOnDestroy() {
    this.clearListeners();
  }
  addRecord() {
    this.record_id = 'new';
    this.mode = 'edit';
  }

}
