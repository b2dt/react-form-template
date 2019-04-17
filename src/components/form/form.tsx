import * as React from 'react'
import {FormFieldProps} from '../../models/formFieldProps';
import {ColumnRange} from "../../models/columnRange";
import * as FormUtil from "../../utility/formUtil"
import FormSection from "../formSection/formSection";

export interface FormProps {
	title: string
	formFields?: FormFieldProps[]
	inputsPerRow?: ColumnRange
	
	submitForm?: (any) => any
}

export default class Form extends React.Component<FormProps, any> {
	constructor(props) {
		super(props);
		this.updateFieldValue = this.updateFieldValue.bind(this)
		this.createForm = this.createForm.bind(this)
		this.submitLocalForm = this.submitLocalForm.bind(this)
		this.resetForm = this.resetForm.bind(this)
		
	}
	
	componentDidMount(): void {
	
	}
	
	resetForm() {
	
	}
	
	updateFieldValue(e) {
		const {props} = this
		console.log(props)
	}
	
	submitLocalForm() {
		const {props} = this
		if (props.children === null || props.children === undefined) {
			console.log(props.formFields)
			props.submitForm(props.formFields)
		} else {
			let fields: any[] = React.Children.map(props.children, (child: any) => {
				return {...child.props.formFields, sectionIndex: child.props.sectionIndex}
			})
			console.log(props.children)
			props.submitForm(fields)
		}
	}
	
	createForm() {
		const {props} = this
		if (props.children === null || props.children === undefined) {
			return (
				<div className={"form-field-wrapper"}>
					{FormUtil.convertFormFieldPropsToInputs(props.formFields, props.inputsPerRow, this.updateFieldValue)}
				</div>
			)
		} else {
			return (
				<div className={"form-field-wrapper"}>
					{React.Children.map(props.children, (child: any, index: any) => {
						console.log(child.props)
						return (
							<FormSection
								title={child.props.title}
								inputsPerRow={child.props.inputsPerRow}
								formFields={child.props.formFields}
								index={index}
								updateFieldValue={this.updateFieldValue}
							/>
						)
					})}
				</div>
			)
		}
	}
	
	createButtons() {
		return (
			<div className={"button-container"}>
				<div className={"button form-button"}
						 onClick={this.submitLocalForm}>
					Submit
				</div>
				<div className={"button form-button"}
						 onClick={this.resetForm}>
					Reset Form
				</div>
			</div>
		)
	}
	
	render(): React.ReactNode {
		const {props} = this
		let formFields = this.createForm()
		let buttons = this.createButtons()
		return (
			<div className={'form-container'}>
				<div className={'form-title'}>{props.title}</div>
				{formFields}
				<div className={"button-container-separator"}/>
				{buttons}
			</div>
		);
	}
}