import * as React from 'react'
import {FieldProps, FormFieldProps} from "../../models/formFieldProps";
import {ColumnRange} from "../../models/columnRange";
import {FlatState, FormUtil, InputType, UpdateObj} from "../../utility/formUtil";
import {Convert} from "../../utility/converter";
import {FormFunctions} from "../form/form";

export interface FormSectionProps {
	formFields?: FieldProps[]
	formSectionValues?: FormSectionProps[] | JSX.Element[]
	title?: string
	columns?: ColumnRange
	index?: number
	formFunctions?: FormFunctions
	submitBtn?: JSX.Element | FormFieldProps
	onSectionSubmit?: (flatState: FlatState[]) => any
}

export default class FormSection extends React.Component<FormSectionProps, any> {
	constructor(props) {
		super(props)
		this.updateFieldValue = this.updateFieldValue.bind(this)
		this.createSectionSubmitButton = this.createSectionSubmitButton.bind(this)
		this.sectionSubmit = this.sectionSubmit.bind(this)
		this.createErrorMsg = this.createErrorMsg.bind(this)
		this.state = {
			formSectionErrorMsg: ""
		}
	}
	
	createSectionSubmitButton() {
		const {props} = this
		if (props.onSectionSubmit != undefined) {
			if (props.submitBtn == undefined) {
				let fieldProps: FormFieldProps = {
					id: "form-submit-button",
					inputType: InputType.BUTTON,
					index: -1,
					label: "Submit"
				}
				return Convert.to.button(fieldProps, this.sectionSubmit)
			} else
				return props.submitBtn
		} else return ""
	}
	
	sectionSubmit() {
		const {props} = this
		this.setState({
			formSectionValues: FormUtil.state.updateErrors([{...props}])
		})
		
		let flatState: FlatState[] = FormUtil.state.flatten([props])
		
		console.log("SectionFlatState:", flatState)
		let errors: FlatState[] = flatState.filter(state => state.error == true)
		
		if (errors.length == 0 && flatState.length > 0) {
			this.setState({
				formSectionErrorMsg: ""
			})
			props.onSectionSubmit(flatState)
		} else {
			this.setState({
				formSectionErrorMsg: "Error(s) on Form Sub-Section: " + errors.length + " Error(s)"
			})
		}
	}
	
	createErrorMsg(): any {
		const {state} = this
		if (state.formSectionErrorMsg != "") {
			return (
				<h1 className="form-error">{state.formSectionErrorMsg}</h1>
			)
		} else
			return ""
	}
	
	updateFieldValue(updateObj: UpdateObj) {
		const {props} = this
		if (updateObj.sectionIndices != undefined)
			updateObj.sectionIndices.unshift(props.index)
		else
			updateObj.sectionIndices = [props.index]
		props.formFunctions.updateFieldVal(updateObj)
	}
	
	render() {
		const {props, state} = this
		let formFns: FormFunctions = {
			updateFieldVal: this.updateFieldValue
		}
		const separator = props.title == null ? "" : (<div className={"title-separator"}/>)
		const title = props.title == null ? "" : (<div className={"form-section-title"}>{props.title}</div>)
		let submitButton = this.createSectionSubmitButton(),
			errorMsg = this.createErrorMsg(),
			formFields = Convert.formFields.to.html(props.formFields, props.columns, formFns),
			children = props.formSectionValues ? Convert.to.sections(props.formSectionValues, formFns) : ""
		return (
			<div className={"form-section"}>
				{title}
				{separator}
				{formFields}
				{children}
				{submitButton}
				{errorMsg}
			</div>
		)
	}
}