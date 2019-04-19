import * as React from 'react';
import {FormFieldProps} from '../../models/formFieldProps';
import {ColumnRange} from "../../models/columnRange";
import * as FormUtil from "../../utility/formUtil";
import * as PropMapper from "../../mappers/propMapper";
import FormSection, {FormSectionProps} from "../formSection/formSection";

export interface FormProps {
	title: string
	formFields?: FormFieldProps[]
	inputsPerRow?: ColumnRange
	
	submitForm?: (any) => any
}

export interface FormValues {
	formFields?: FormFieldProps[]
	formSectionValues?: FormSectionProps[]
}

export default class Form extends React.Component<FormProps, FormValues> {
	constructor(props) {
		super(props);
		this.updateFieldValue = this.updateFieldValue.bind(this)
		this.createForm = this.createForm.bind(this)
		this.submitLocalForm = this.submitLocalForm.bind(this)
		this.resetForm = this.resetForm.bind(this)
		this.state = {
			formSectionValues: props.children === undefined ? [] : PropMapper.mapSectionPropsToState(props.children),
			formFields: []
		}
	}
	
	componentDidMount(): void {
		const {props, state} = this
		if (props.children !== null || props.children !== undefined) {
		
		}
	}
	
	resetForm() {
	
	}
	
	updateFieldValue(newVal: string, fieldIndex: number, sectionIndex: number) {
		const {props} = this
		console.log("Field Index:" + fieldIndex + ", sectionIndex:" + sectionIndex)
		
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
		const {state, props} = this
		if (state.formSectionValues == [] || state.formSectionValues === null) {
			return (
				<div className={"form-field-wrapper"}>
					{FormUtil.convertFormFieldPropsToInputs(state.formFields, props.inputsPerRow, this.updateFieldValue)}
				</div>
			)
		} else {
			return (
				<div className={"form-field-wrapper"}>
					{state.formSectionValues.map((child: any, index: any) => {
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