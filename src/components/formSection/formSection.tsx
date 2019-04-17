import * as React from 'react'
import * as FormCreationUtil from "../../utility/formCreationUtil";
import {FormFieldProps} from "../../models/formFieldProps";
import {ColumnRange} from "../../models/columnRange";

export interface FormSectionProps {
	title: string
	sectionIndex?: number
	formFields: FormFieldProps[]
	inputsPerRow?: ColumnRange
}

export default class FormSection extends React.Component<FormSectionProps, any> {
	constructor(props) {
		super(props)
	}
	
	updateFieldValue(e) {
		const {state} = this
		// console.log(state.formState)
	}
	
	render() {
		const {props} = this
		let formFields = FormCreationUtil.convertFormFieldPropsToInputs(props.formFields, props.inputsPerRow, this.updateFieldValue)
		return (
			<div className={"form-section"}>
				<div className={"form-section-title"}>{props.title}</div>
				<div className={"title-separator"}/>
				{formFields}
			</div>
		)
	}
}