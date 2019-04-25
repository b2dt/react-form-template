import {InputType} from "../utility/validation";

export interface FormFieldProps {
	id: string
	inputType: InputType
	label: string
	index: number
	
	sectionIndex?: number
	value?: string
	required?: boolean
	validation?: any
	errorMsg?: string
	defaultText?: string
	placeholder?: string
}