
import { PluginService } from '../../services';
import { environment } from '../../../environments/environment';

export class  DynamicComponent {

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

    constructor(protected pluginService: PluginService) {
    }

    loadFileManager(event: any) {
        let target_field = event.target.dataset.urlfield;
        this.pluginService.filemanager(target_field);
    }
}
