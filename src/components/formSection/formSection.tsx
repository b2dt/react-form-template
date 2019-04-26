import * as React from 'react'
import * as FormFieldConverter from "../../utility/formFieldConverter";
import {FormFieldProps} from "../../models/formFieldProps";
import {ColumnRange} from "../../models/columnRange";
import {UpdateObj} from "../../utility/formUtil";

export interface FormSectionProps {
	formFields?: FormFieldProps[]
	title?: string
	columns?: ColumnRange
	index?: any
	
	updateFieldValue?: (x: UpdateObj) => any
}

export default class FormSection extends React.Component<FormSectionProps, any> {
	constructor(props) {
		super(props)
		this.updateFieldValue = this.updateFieldValue.bind(this)
	}
	
	updateFieldValue(updateObj: UpdateObj) {
		const {props} = this
		updateObj.sectionIndex = props.index
		this.props.updateFieldValue(updateObj)
	}
	
	render() {
		const {props} = this
		let formFields = FormFieldConverter.convertFormFieldPropsToInputs(props.formFields, props.columns, this.updateFieldValue)
		const separator = props.title == null ? "" : (<div className={"title-separator"}/>)
		return (
			<div className={"form-section"}>
				<div className={"form-section-title"}>{props.title}</div>
				{separator}
				{formFields}
				{props.children}
			</div>
		)
	}
}