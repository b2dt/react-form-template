import * as React from 'react';
import {FormFieldProps} from '../../models/formFieldProps';
import {ColumnRange} from "../../models/columnRange";
import {FormSectionProps} from "../formSection/formSection";
import {FlatState, FormUtil, UpdateObj} from "../../utility/formUtil";
import {Convert} from "../../utility/converter";

export interface FormProps {
	title: string
	formFields?: FormFieldProps[]
	columns?: ColumnRange,
	submissionErrorMsg?: string
	
	submitForm: (any) => any
}

export interface FormValues {
	formSectionValues?: FormSectionProps[] | JSX.Element[]
	formFns: FormFunctions,
	formErrorMsg: string
}

export interface FormFunctions {
	updateFieldVal: (input: UpdateObj) => any
}

export default class Form extends React.Component<FormProps, FormValues> {
	constructor(props) {
		super(props);
		this.updateFieldValue = this.updateFieldValue.bind(this)
		this.createForm = this.createForm.bind(this)
		this.submitLocalForm = this.submitLocalForm.bind(this)
		this.resetForm = this.resetForm.bind(this)
		this.createErrorMsg = this.createErrorMsg.bind(this)
		this.state = {
			formSectionValues: [],
			formFns: {
				updateFieldVal: this.updateFieldValue,
			},
			formErrorMsg: ""
		}
	}
	
	componentDidMount(): void {
		const {props} = this
		this.setState({
			formSectionValues: props.children === undefined ? [] : FormUtil.create.state(props.children)
		})
	}
	
	resetForm() {
		const {state} = this
		let copyState: any[] = [...state.formSectionValues]
		FormUtil.state.resetProps(state.formSectionValues)
		this.setState({
			formSectionValues: copyState
		})
	}
	
	updateFieldValue(updateObj: UpdateObj) {
		const {state} = this
		let copyState: any[] = [...state.formSectionValues]
		FormUtil.state.updateValue(updateObj, state.formSectionValues)
		this.setState({
			formSectionValues: copyState
		})
		console.log(copyState)
	}
	
	submitLocalForm() {
		const {state, props} = this
		console.log("State:", state.formSectionValues)
		let flatState: FlatState[] = FormUtil.state.flatten(state.formSectionValues)
		console.log("FlattenedState:", flatState)
		let errors: FlatState[] = flatState.filter(state => state.error == true)
		if (errors.length == 0) {
			props.submitForm(flatState)
		} else {
			this.setState({
				formErrorMsg: "Error(s) on Form: " + errors.length + " Errors"
			})
		}
		//prop submit of flattened value array
		
	}
	
	createForm() {
		const {state} = this
		let children: JSX.Element[] = Convert.to.sections(state.formSectionValues, state.formFns)
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
	
	createErrorMsg(): any {
		const {state} = this
		if (state.formErrorMsg != "") {
			return (
				<h1 className="form-error">{state.formErrorMsg}</h1>
			)
		} else
			return ("")
	}
	
	render(): React.ReactNode {
		const {props} = this
		let formFields = this.createForm()
		let buttons = this.createButtons()
		let errorMsg = this.createErrorMsg()
		return (
			<div className={'form-container'}>
				<div className={'form-title'}>{props.title}</div>
				{formFields}
				<div className={"button-container-separator"}/>
				{buttons}
				{errorMsg}
			</div>
		);
	}
}