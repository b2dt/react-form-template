import * as React from 'react'
import {FormFieldProps} from '../../models/formFieldProps';
import {ColumnRange} from "../../models/columnRange";
import * as FormCreationUtil from "../../utility/formCreationUtil"

export interface FormProps {
	title: string
	formFields?: FormFieldProps[]
	inputsPerRow?: ColumnRange
	
	submitForm?: (any) => any
}

export interface FormState {
	formFields?: FormFieldProps[]
}

export default class Form extends React.Component<FormProps, FormState> {
	constructor(props) {
		super(props);
		this.updateFieldValue = this.updateFieldValue.bind(this)
		this.createForm = this.createForm.bind(this)
		this.submitLocalForm = this.submitLocalForm.bind(this)
		this.resetForm = this.resetForm.bind(this)
		this.state = {
			formFields: []
		}
	}
	
	componentDidMount(): void {
	
	}
	
	resetForm() {
	
	}
	
	updateFieldValue(e) {
		const {state} = this
		// console.log(state.formState)
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
					{FormCreationUtil.convertFormFieldPropsToInputs(props.formFields, props.inputsPerRow, this.updateFieldValue)}
				</div>
			)
		} else {
			return (
				<div className={"form-field-wrapper"}>
					{React.Children.map(props.children,
						(child: any, index) => React.cloneElement(child, {sectionIndex: index}))
					}
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
		React.Children.forEach(props.children,(child) => console.log(child))
		console.log(formFields)
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