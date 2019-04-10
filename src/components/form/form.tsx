import * as React from 'react'
import {FormFieldProps} from '../../models/formFieldProps';
import {InputType} from "../../models/inputType";
import {ColumnRange} from "../../models/columnRange";
import classNames from 'classnames'
import Input from "../general/input/input";

export interface FormProps {
	title: string
	formFields?: FormFieldProps[]
	inputsPerRow?: ColumnRange
}

export default class Form extends React.Component<FormProps, any> {
	constructor(props) {
		super(props);
		this.convertFormFieldPropsToInputs = this.convertFormFieldPropsToInputs.bind(this)
		this.convert = this.convert.bind(this)
		this.updateFieldValue = this.updateFieldValue.bind(this)
		this.createForm = this.createForm.bind(this)
	}
	
	componentDidMount(): void {
		// console.log(this.state.formState)
	}
	
	updateFieldValue(e) {
		const {state} = this
		console.log(state.formState)
	}
	
	convertToTextBox(textProps: FormFieldProps, columns: ColumnRange) {
		const columnClassname = columns + "-columns"
		let classes = classNames("input", columnClassname)
		return (
			<Input
				key={textProps.id}
				id={textProps.id}
				classes={classes}
				label={textProps.label}
				index={textProps.index}
				updateFormList={this.updateFieldValue}
				inputProps={{
					type: "text",
					placeholder: textProps.placeholder,
				}}
			/>
		)
	}
	
	convertToButton(buttonProps: FormFieldProps, columns: ColumnRange) {
	
	}
	
	convertToDropdown(dropdownProps: FormFieldProps, columns: ColumnRange) {
	
	}
	
	convertToTextArea(textAreaProps: FormFieldProps, columns: ColumnRange) {
	
	}
	
	convert(formProp: FormFieldProps) {
		const {props} = this
		if (formProp.inputType == InputType.Text)
			return this.convertToTextBox(formProp, props.inputsPerRow)
		else if (formProp.inputType == InputType.Button)
			return this.convertToButton(formProp, props.inputsPerRow)
		else if (formProp.inputType == InputType.Dropdown)
			return this.convertToDropdown(formProp, props.inputsPerRow)
		else if (formProp.inputType == InputType.TextArea)
			return this.convertToTextArea(formProp, props.inputsPerRow)
	}
	
	convertFormFieldPropsToInputs() {
		return this.props.formFields.map(field => this.convert(field))
	}
	
	createForm() {
		const {props} = this
		if (props.children === null || props.children === undefined) {
			return this.convertFormFieldPropsToInputs()
		} else {
			return this.props.children
		}
	}
	
	render(): React.ReactNode {
		const {props} = this
		let formFields = this.createForm()
		return (
			<div id='formContainer'>
				<h1>{props.title}</h1>
				{formFields}
			</div>
		);
	}
}