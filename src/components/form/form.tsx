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
		this.state = {
			formFields: []
		}
	}
	
	componentDidMount(): void {
	
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
				return {...child.props.formFields}
			})
			console.log(props.children)
			console.log(fields)
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
					{React.Children.map(this.props.children,
						(child: any, index) => {
							child = {...child}
							console.log(child)
							return child
						})
					}
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
				<button className={"form-button"}
								type="button"
								onClick={this.submitLocalForm}>
					Submit
				</button>
			</div>
		);
	}
}