import * as React from 'react'
import * as FormUtil from "../../utility/formUtil";
import {FormFieldProps} from "../../models/formFieldProps";
import {ColumnRange} from "../../models/columnRange";

export interface FormSectionProps {
	title: string
	formFields: FormFieldProps[]
	inputsPerRow?: ColumnRange
	index?: any
	
	updateFieldValue?: (newVal, fieldIndex, sectionIndex) => any
}

export default class FormSection extends React.Component<FormSectionProps, any> {
	constructor(props) {
		super(props)
		this.updateFieldValue = this.updateFieldValue.bind(this)
	}
	
	updateFieldValue(newVal: string, fieldIndex: number) {
		const {props} = this
		console.log(newVal + " and index " + fieldIndex)
		this.props.updateFieldValue(newVal, fieldIndex, props.index)
	}
	
	render() {
		const {props} = this
		let formFields = FormUtil.convertFormFieldPropsToInputs(props.formFields, props.inputsPerRow, this.updateFieldValue)
		return (
			<div className={"form-section"}>
				<div className={"form-section-title"}>{props.title}</div>
				<div className={"title-separator"}/>
				{formFields}
			</div>
		)
	}
}