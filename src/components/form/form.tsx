import * as React from 'react';
import {FormFieldProps} from '../../models/formFieldProps';
import {ColumnRange} from "../../models/columnRange";
import {FormSectionProps} from "../formSection/formSection";
import {FormUtil, UpdateObj} from "../../utility/formUtil";
import {Convert} from "../../utility/converter";

export interface FormProps {
	title: string
	formFields?: FormFieldProps[]
	columns?: ColumnRange
	
	submitForm?: (any) => any
}

export interface FormValues {
	formSectionValues?: FormSectionProps[] | JSX.Element[]
}

export default class Form extends React.Component<FormProps, FormValues> {
	constructor(props) {
		super(props);
		this.updateFieldValue = this.updateFieldValue.bind(this)
		this.createForm = this.createForm.bind(this)
		this.submitLocalForm = this.submitLocalForm.bind(this)
		this.resetForm = this.resetForm.bind(this)
		this.state = {
			formSectionValues: []
		}
	}
	
	componentDidMount(): void {
		const {props} = this
		this.setState({
			formSectionValues: props.children === undefined ? [] : FormUtil.create.state(props.children)
		})
	}
	
	resetForm() {
	
	}
	
	updateFieldValue(updateObj: UpdateObj) {
		const {state} = this
		let copyState: any[] = [...state.formSectionValues]
		FormUtil.state.update(updateObj, copyState)
		this.setState({
			formSectionValues: copyState
		})
	}
	
	submitLocalForm() {
		const {state} = this
		console.log("Submit: " + state)
	}
	
	createForm() {
		const {state} = this
		let children: JSX.Element[] = Convert.to.sections(state.formSectionValues, this.updateFieldValue)
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