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
	formErrorCount: number
	submissionErrorMsg: string
	formFns: FormFunctions
}

export interface FormFunctions {
	updateFieldVal: (input: UpdateObj) => any
}

export enum Action {
	INCREASE,
	DECEASE,
	NONE
}

export default class Form extends React.Component<FormProps, FormValues> {
	constructor(props) {
		super(props);
		this.updateFieldValue = this.updateFieldValue.bind(this)
		this.createForm = this.createForm.bind(this)
		this.submitLocalForm = this.submitLocalForm.bind(this)
		this.resetForm = this.resetForm.bind(this)
		this.increaseErrorCount = this.increaseErrorCount.bind(this)
		this.decreaseErrorCount = this.decreaseErrorCount.bind(this)
		this.decreaseErrorCount = this.decreaseErrorCount.bind(this)
		this.state = {
			formSectionValues: [],
			formErrorCount: 0,
			submissionErrorMsg: "",
			formFns: {
				updateFieldVal: this.updateFieldValue,
			}
		}
	}
	
	componentDidMount(): void {
		const {props} = this
		this.setState({
			formSectionValues: props.children === undefined ? [] : FormUtil.create.state(props.children)
		})
	}
	
	updateErrorCount(action: Action) {
		if (action == Action.INCREASE)
			this.increaseErrorCount()
		else if (action == Action.DECEASE)
			this.decreaseErrorCount()
		else
			return
	}
	
	increaseErrorCount() {
		const {state} = this
		console.log("increasing")
		this.setState({
			formErrorCount: state.formErrorCount + 1
		})
	}
	
	decreaseErrorCount() {
		const {state} = this
		console.log("decreasing")
		this.setState({
			formErrorCount: state.formErrorCount - 1
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
		let action: Action = FormUtil.state.updateValue(updateObj, state.formSectionValues)
		console.log("Updating error count:", action)
		this.updateErrorCount(action)
		this.setState({
			formSectionValues: copyState
		})
	}
	
	submitLocalForm() {
		const {state, props} = this
		let flatState: FlatState[] = FormUtil.state.flatten(state.formSectionValues)
		console.log("FlattenedState:", flatState)
		if (state.formErrorCount > 0) {
			let errorStr: string = props.submissionErrorMsg + ": " + state.formErrorCount + " errors in form."
			this.setState({
				formErrorCount: state.formErrorCount,
				submissionErrorMsg: errorStr
			})
		}
		//prop submit of flattened value array
		this.props.submitForm(flatState)
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
	
	render(): React.ReactNode {
		const {props, state} = this
		let formFields = this.createForm()
		let buttons = this.createButtons()
		console.log(state.formErrorCount)
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