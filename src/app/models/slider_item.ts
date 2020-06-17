
import { IsNotEmpty, IsUrl } from "class-validator";
import { BaseSection } from './base_section';

export class SliderItem extends BaseSection {
    
    id: number;
    
    page_section_id: number;
    
    @IsNotEmpty({
        message: "Title is required"
    })
    field_1: string;
    
    @IsNotEmpty({
        message: "Image Url is required"
    })
    @IsUrl({}, {
        message: "Image Url must be a valid url"
    })
    field_2: string;
    
    @IsNotEmpty({
        message: "Link is required"
    })
    field_3: string;
    
    field_4: string;
    
    field_5: string;

    constructor(section_id, data = null) {
        super();
        this.page_section_id = section_id;
        if (data) {
            this.id = data.id;
            this.field_1 = data.field_1;
            this.field_2 = data.field_2;
            this.field_3 = data.field_3;
            this.field_4 = data.field_4;
            this.field_5 = data.field_5;
        } else {
            this.id = 0;
            this.field_1 = null;
            this.field_2 = null;
            this.field_3 = null;
            this.field_4 = null;
            this.field_5 = null;
        }
    }
}