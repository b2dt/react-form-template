import * as React from 'react'
import {FormFieldProps} from "../../models/formFieldProps";
import {ColumnRange} from "../../models/columnRange";
import {UpdateObj} from "../../utility/formUtil";
import {Convert} from "../../utility/converter";

export interface FormSectionProps {
	formFields?: FormFieldProps[]
	formSectionValues?: FormSectionProps[] | JSX.Element[]
	title?: string
	columns?: ColumnRange
	index?: number
	
	updateFieldValue?: (x: UpdateObj) => any
}

export default class FormSection extends React.Component<FormSectionProps, any> {
	constructor(props) {
		super(props)
		this.updateFieldValue = this.updateFieldValue.bind(this)
	}
	
	updateFieldValue(updateObj: UpdateObj) {
		const {props} = this
		if (updateObj.sectionIndices != undefined)
			updateObj.sectionIndices.unshift(props.index)
		else
			updateObj.sectionIndices = [props.index]
		
		console.log("FormSection Update:", updateObj, props.index)
		this.props.updateFieldValue(updateObj)
	}
	
	render() {
		const {props} = this
		let formFields = Convert.formFields(props.formFields, props.columns, this.updateFieldValue)
		let children = props.formSectionValues ? Convert.to.sections(props.formSectionValues, this.updateFieldValue) : ""
		const separator = props.title == null ? "" : (<div className={"title-separator"}/>)
		return (
			<div className={"form-section"}>
				<div className={"form-section-title"}>{props.title}</div>
				{separator}
				{formFields}
				{children}
			</div>
		)
	}
}