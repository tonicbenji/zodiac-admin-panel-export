
import { FormGroup } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { PluginService } from '../../services';
import { MatDialogRef } from '@angular/material';
export class BaseEditComponent {

    public tinyMceSettings = {
        skin_url: `${environment.cdnUrl}` + '/admin/tinymce/skins/lightgray',
        branding: false,
        menubar: false,
        resize: true,
        statusbar: true, // required for resize to work
        height: 320,
        browser_spellcheck: true,
        toolbar: 'bold italic underline hr formatselect fontsizeselect | alignleft aligncenter alignright | bullist numlist | link image | undo redo code | preview',
        plugins: ['advlist preview link image hr code contextmenu'],
        image_title: true, // enable title field in the Image dialog
        image_description: false, // disable image description
        // file_picker_types: 'image', // custom filepicker only to Image dialog
        // file_browser_callback: this.imageUploaderS3, // and here's our custom image picker
    };

    order_ranges: any = [];
    errors: any = [];

    constructor(protected pluginService: PluginService) {
        this.order_ranges = Array(30).fill("").map((x, i) => i + 1);
    }

    string_to_slug(str: string) {
        str = str.replace(/^\s+|\s+$/g, ''); // trim
        str = str.toLowerCase();

        // remove accents, swap ñ for n, etc
        var from = "·/_,:;";
        var to = "------";
        for (var i = 0, l = from.length; i < l; i++) {
            str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
        }

        str = str.replace(/[^a-z0-9 -]/g, '') // remove invalid chars
            .replace(/\s+/g, '-') // collapse whitespace and replace by -
            .replace(/-+/g, '-'); // collapse dashes

        return str;
    }

    handleError(response: any, form: FormGroup) {
        console.log(response, form);
        for (let key in response.error.errors) {
            if (form.get(key)) {
                form.get(key).setErrors({ 'server_validation': response.error.errors[key][0] });
                form.get(key).markAsTouched();
            }
        }
    }

    loadFileManager(event: any) {
        let target_field = event.target.dataset.urlfield;
        this.pluginService.filemanager(target_field);
    }

    imageUploaderS3(field_name: string, url: string, type: string, win: any) {
        var w = window,
            d = document,
            e = d.documentElement,
            g = d.getElementsByTagName('body')[0],
            x = w.innerWidth || e.clientWidth || g.clientWidth,
            y = w.innerHeight || e.clientHeight || g.clientHeight;

        var cmsURL = "{!! url('filemanager/index.html?langCode=en') !!}" + "&field_name=" + field_name;
        if (type == 'image') {
            cmsURL = cmsURL + "&filter=image";
        }
        win.open({
            file: cmsURL,
            title: 'Filemanager',
            width: x * 0.8,
            height: y * 0.8,
            resizable: "yes",
            close_previous: "no"
        });
    }
}
