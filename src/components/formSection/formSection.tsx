import * as React from 'react'
import {FormFieldProps} from "../../models/formFieldProps";
import {ColumnRange} from "../../models/columnRange";
import {UpdateObj} from "../../utility/formUtil";
import {Convert} from "../../utility/converter";
import {FormFunctions} from "../form/form";

export interface FormSectionProps {
	formFields?: FormFieldProps[]
	formSectionValues?: FormSectionProps[] | JSX.Element[]
	title?: string
	columns?: ColumnRange
	index?: number
	formFunctions?: FormFunctions
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
		
		this.props.formFunctions.updateFieldVal(updateObj)
	}
	
	render() {
		const {props} = this
		let formFns: FormFunctions = {
			updateFieldVal: this.updateFieldValue
		}
		let formFields = Convert.formFields(props.formFields, props.columns, formFns)
		let children = props.formSectionValues ? Convert.to.sections(props.formSectionValues, formFns) : ""
		const separator = props.title == null ? "" : (<div className={"title-separator"}/>)
		const title = props.title == null ? "" : (<div className={"form-section-title"}>{props.title}</div>)
		return (
			<div className={"form-section"}>
				{title}
				{separator}
				{formFields}
				{children}
			</div>
		)
	}
}