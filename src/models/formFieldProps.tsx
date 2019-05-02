import {InputType} from "../utility/formUtil";

export interface FormFieldProps {
	id: string
	inputType: InputType | any
	index: number
	
	label?: string
	
	sectionIndex?: number
	value?: string
	required?: boolean
	validation?: (input: string) => boolean
	showError?: boolean
	errorMsg?: string
	defaultText?: string
	placeholder?: string
}