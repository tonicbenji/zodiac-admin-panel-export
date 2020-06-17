
import { validateSync } from "class-validator";
import { Observable, from, of } from 'rxjs';

export class    BaseSection
{
    protected errors: {};

    public valid:boolean = false;

    items: any[];

    constructor() {
        this.errors = {};
    }

    private parseError(validation_error: any)
    {
        if (validation_error.constraints) {
            for (const constraint in validation_error.constraints) {
                if (!validation_error.target.errors[validation_error.property]) {
                    validation_error.target.errors[validation_error.property] = [];
                }
                validation_error.target.errors[validation_error.property].push(validation_error.constraints[constraint]);
            }
        } else if (validation_error.children && validation_error.children.length > 0) {
            for (const key in validation_error.children) {
                this.parseError(validation_error.children[key]);
            }
        }
    }

    /**
     * Method to override for clearing child elements if any
     * Being used by the validator to clear messages
     */
    public clear() {
        this.errors = {};
        if (this.items) {
            for(var index = 0; index < this.items.length; index++) {
                this.items[index].errors = {};
            }
        }
    }

    public validate(): Boolean {
        let errors = validateSync(this, { validationError: { target: true }})
        this.clear();
        if (errors.length == 0) {
            this.valid = true;
            return true;
        } else {
            for (const key in errors) {
                this.parseError(errors[key]);
            }
            this.valid = false;
            return false;
        }
    }
}