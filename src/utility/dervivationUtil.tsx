import {FormFieldProps} from "../models/formFieldProps";
import {InputType} from "./formUtil";
import {CheckboxState} from "../components/general/checkbox/checkbox";

export const Derive: any = {
	value: {
		from: {
			formField: (formField: FormFieldProps): any => {
				if (formField.inputType == InputType.CHECKBOX)
					return formField.defaultText == CheckboxState.CHECKED
				else
					return formField.defaultText
			}
		}
	},
	required: {
		from: {
			formField: (formField: FormFieldProps): boolean => {
				return formField.required ? !(formField.defaultText == undefined || formField.defaultText.trim() == "") : true
			}
		}
	}
}