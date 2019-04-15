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
	
	convertToTextBox(textProps: FormFieldProps, columnClassName: string) {
		let classes = classNames('field', columnClassName)
		return (
			<div className={classes} key={textProps.id}>
				<Input
					id={textProps.id}
					classes={"form-text-input"}
					label={textProps.label}
					index={textProps.index}
					updateFormList={this.updateFieldValue}
					inputProps={{
						type: "text",
						placeholder: textProps.placeholder,
					}}
				/>
			</div>
		)
	}
	
	convertToButton(buttonProps: FormFieldProps, columnClassName: string) {
		let classes = classNames("form-text-input", columnClassName)
		
		
	}
	
	convertToDropdown(dropdownProps: FormFieldProps, columnClassName: string) {
		let classes = classNames("form-text-input", columnClassName)
		
		
	}
	
	convertToTextArea(textAreaProps: FormFieldProps, columnClassName: string) {
		let classes = classNames("form-text-input", columnClassName)
		
		
	}
	
	convert(formProp: FormFieldProps) {
		const {props} = this
		let columnClassName = classNames({"col-one": props.inputsPerRow == ColumnRange.ONE}, {"col-two": props.inputsPerRow == ColumnRange.TWO}, {"col-three": props.inputsPerRow == ColumnRange.THREE})
		
		if (formProp.inputType == InputType.Text)
			return this.convertToTextBox(formProp, columnClassName)
		else if (formProp.inputType == InputType.Button)
			return this.convertToButton(formProp, columnClassName)
		else if (formProp.inputType == InputType.Dropdown)
			return this.convertToDropdown(formProp, columnClassName)
		else if (formProp.inputType == InputType.TextArea)
			return this.convertToTextArea(formProp, columnClassName)
	}
	
	convertFormFieldPropsToInputs() {
		return this.props.formFields.map(field => (this.convert(field)))
	}
	
	createForm() {
		const {props} = this
		console.log(props.inputsPerRow)
		if (props.children === null || props.children === undefined) {
			return (
				<div className={"form-field-wrapper"}>
					{this.convertFormFieldPropsToInputs()}
				</div>
			)
		} else {
			return (
				<div className={"form-field-wrapper"}>
					{this.props.children}
				</div>
			)
		}
	}
	
	render(): React.ReactNode {
		const {props} = this
		let formFields = this.createForm()
		return (
			<div className={'form-container'}>
				<div className={'form-title'}>{props.title}</div>
				{formFields}
			</div>
		);
	}
}