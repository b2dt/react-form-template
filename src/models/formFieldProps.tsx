import {InputType} from "./inputType";

export interface FormFieldProps {
	id: string
	inputType: InputType
	label: string
	index: number
	
	value?: string
	required?: boolean
	defaultText?: string
	placeholder?: string
}