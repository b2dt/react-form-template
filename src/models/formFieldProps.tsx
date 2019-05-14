import {InputType} from "../utility/formUtil";

export interface FormFieldProps {
	id: string
	inputType: InputType | any
	index: number
	classes?: string
	label?: string
	
	required?: boolean
	sectionIndex?: number
	validation?: (input: string) => boolean
	showError?: boolean
	errorMsg?: string
	defaultText?: string
	placeholder?: string
}