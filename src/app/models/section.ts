
import { IsNotEmpty, IsString, IsEmail, IsUrl, ValidateNested, ValidateIf } from "class-validator";
import { BaseSection } from './base_section';
import { SliderItem } from './slider_item';
import { TenStepItem } from './ten_step_item';
export class Section extends BaseSection {

    id: number;

    page_id: number;

    @IsNotEmpty({
        message: "Section Type is required"
    })
    section_type_id: number;

    section_type: string;

    enabled: boolean;

    @ValidateIf(o => o.isBanner() || o.isList() || o.isHeading() || o.isVideo() || o.isWideBanner())
    @IsNotEmpty({
        message: "Field is required"
    })
    field_1: any;

    @ValidateIf(o => o.isBanner() || o.isVideo() || o.isWideBanner())
    @IsNotEmpty({
        message: "Field is required"
    })
    field_2: any;

    field_3: any;

    field_4: any;

    field_5: any;

    @ValidateNested({
        each: true
    })
    items: any[];

    order: 0;

    constructor(page_id, data = null) {
        super();

        this.page_id = page_id;
        if (data) {
            this.id = data.id;
            this.section_type_id = data.section_type_id;
            this.section_type = data.section_type;
            this.enabled = data.enabled;
            this.field_1 = data.field_1;
            this.field_2 = data.field_2;
            this.field_3 = data.field_3;
            this.field_4 = data.field_4;
            this.field_5 = data.field_5;
            this.order = data.order;
            this.items = data.items;
        } else {
            this.id = 0;
            this.section_type_id = null;
            this.section_type = null;
            this.enabled = true;
            this.field_1 = null;
            this.field_2 = null;
            this.field_3 = null;
            this.field_4 = null;
            this.field_5 = null;
            this.order = 0;
            this.items = [];
        }
    }

    public clear() {
        super.clear();
        for (let index = 0; index < this.items.length; index++) {
            if (this.items[index].errors && this.items[index].errors.length > 0) {
                this.items[index].errors = [];
            }
        }
    }

    public hasItems(): boolean {
        return this.isSlider() || this.isTenSteps() || this.isAccordion();
    }
    public isList(): boolean {
        return this.isCategoriesList() || this.isPoolsList() || this.isFeaturedProductsList();
    }

    public isSlider(): boolean {
        return this.section_type_id == 1;
    }

    public isBanner(): boolean {
        return this.section_type_id == 2;
    }

    public isCategoriesList(): boolean {
        return this.section_type_id == 3;
    }

    public isPoolsList(): boolean {
        return this.section_type_id == 4;
    }

    public isFeaturedProductsList(): boolean {
        return this.section_type_id == 5;
    }

    public isQuickLinks(): boolean {
        return this.section_type_id == 6;
    }

    public isHeading(): boolean {
        return this.section_type_id == 7;
    }

    public isContent(): boolean {
        return this.section_type_id == 8;
    }

    public isVideo(): boolean {
        return this.section_type_id == 9;
    }

    public isProductsList(): boolean {
        return this.section_type_id == 10;
    }

    public isTenSteps(): boolean {
        return this.section_type_id == 11;
    }

    public isGuidesList(): boolean {
        return this.section_type_id == 12;
    }

    public isAccordion(): boolean {
        return this.section_type_id == 13;
    }

    public isWideBanner(): boolean {
        return this.section_type_id == 14;
    }

    public rehydrate(data) {
        this.id = data.id;
        this.page_id = data.page_id;
        this.section_type_id = data.section_type_id;
        this.section_type = data.section_type;
        this.enabled = data.enabled;
        this.field_1 = data.field_1;
        this.field_2 = data.field_2;
        this.field_3 = data.field_3;
        this.field_4 = data.field_4;
        this.field_5 = data.field_5;
        this.order = data.order;
        this.items = data.items;
    }
}