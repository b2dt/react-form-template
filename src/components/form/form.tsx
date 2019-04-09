import * as React from 'react'
import {FormFieldProps} from '../../models/formFieldProps';
import {InputType} from "../../models/inputType";
import {ColumnRange} from "../../models/columnRange";
import classNames from 'classnames'
import Input from "../general/input/input";

export interface FormProps {
	formFields: FormFieldProps[]
	inputsPerRow: ColumnRange
}

export default class Form extends React.Component<FormProps, any> {
	constructor(props) {
		super(props);
		this.convertPropsToHtml = this.convertPropsToHtml.bind(this)
		this.convert = this.convert.bind(this)
		this.state = {
			formState : this.props.formFields.map((field, index) => {})
		}
	}
	
	componentDidMount(): void {
	
	}
	
	convertTextToHtml(textProps: FormFieldProps, columns: ColumnRange) {
		const columnClassname = columns + "-columns"
		let classes = classNames("input", columnClassname)
		return (
			<Input
				key={textProps.id}
				id={textProps.id}
				classes={classes}
				label={textProps.label}
				inputProps={{
					type: "text",
					placeholder: textProps.defaultText
				}}
			/>
		)
	}
	
	convertButtonToHtml(buttonProps: FormFieldProps, columns: ColumnRange) {
	
	}
	
	convertDropdownToHtml(dropdownProps: FormFieldProps, columns: ColumnRange) {
	
	}
	
	convertTextAreaToHtml(textAreaProps: FormFieldProps, columns: ColumnRange) {
	
	}
	
	convert(formProp: FormFieldProps) {
		const {props} = this
		if (formProp.inputType == InputType.Text)
			return this.convertTextToHtml(formProp, props.inputsPerRow)
		else if (formProp.inputType == InputType.Button)
			return this.convertButtonToHtml(formProp, props.inputsPerRow)
		else if (formProp.inputType == InputType.Dropdown)
			return this.convertDropdownToHtml(formProp, props.inputsPerRow)
		else if (formProp.inputType == InputType.TextArea)
			return this.convertTextAreaToHtml(formProp, props.inputsPerRow)
	}
	
	convertPropsToHtml() {
		return this.props.formFields.map(field => this.convert(field))
	}
	
	render(): React.ReactNode {
		const {props} = this
		let formFields = this.convertPropsToHtml()
		return (
			<div id='formContainer'>
				{formFields}
			</div>
		);
	}
}