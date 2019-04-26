import * as React from 'react';
import {FormFieldProps} from '../../models/formFieldProps';
import {ColumnRange} from "../../models/columnRange";
import * as PropMapper from "../../mappers/propMapper";
import {FormSectionProps} from "../formSection/formSection";
import {FormUtil, UpdateObj} from "../../utility/formUtil";

export interface FormProps {
	title: string
	formFields?: FormFieldProps[]
	columns?: ColumnRange
	
	submitForm?: (any) => any
}

export interface FormValues {
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
		}
	}
	
	componentDidMount(): void {
	}
	
	resetForm() {
	
	}
	
	updateFieldValue(updateObj: UpdateObj) {
		const {state} = this
		console.log(updateObj)
	}
	
	submitLocalForm() {
		const {state} = this
		console.log("Submit: " + state)
	}
	
	createForm() {
		const {props} = this
		let children = FormUtil.children.create(props.children, this.updateFieldValue)
		console.log(children)
		return (
			<div className={"form-field-wrapper"}>
				{children}
			</div>
		)
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
		const {props, state} = this
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