import {InputType} from "./inputType";

export interface FormFieldProps {
	id: string
	inputType: InputType
	label: string
	
	required?: boolean
	defaultText?: string
}