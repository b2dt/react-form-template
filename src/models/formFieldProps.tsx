import {InputType} from "./inputType";

export interface FormFieldProps {
	id: string
	required: boolean
	inputType: InputType
	
	defaultText?: string
}