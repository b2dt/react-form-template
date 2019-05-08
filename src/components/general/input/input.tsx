import * as React from 'react'
import {InputAttributes} from '../../../models/inputAttributes'
import {UpdateObj} from "../../../utility/formUtil";
import {FormFunctions} from "../../form/form";
import classNames from 'classnames'

export interface InputProps {
	id?: string
	index?: number
	classes?: string
	label?: string
	showError?: boolean
	errorMsg?: string
	inputProps?: InputAttributes
	required?: boolean
	
	formFns: FormFunctions
	validationFn?: (input: string) => boolean
}

export default class Input extends React.Component<InputProps, any> {
	constructor(props) {
		super(props)
		this.localOnChange = this.localOnChange.bind(this)
		this.handleNewProps = this.handleNewProps.bind(this)
		this.createErrorHtml = this.createErrorHtml.bind(this)
	}
	
	componentDidMount(): void {
	}
	
	localOnChange(e) {
		const {props} = this
		let fieldUpdateObj: UpdateObj = {
			fieldIndex: props.index,
			newVal: e.target.value
		}
		props.formFns.updateFieldVal(fieldUpdateObj)
	}
	
	handleOptional(prop: string, defaultValue: any = null, appendDefaultValue: boolean = false) {
		const {props} = this
		if (props.hasOwnProperty(prop)) {
			return appendDefaultValue ? `${props[prop]} ${defaultValue}` : props[prop]
		}
		return defaultValue
	}
	
	handleNewProps() {
		const {props} = this,
			{inputProps} = props
		return {
			type: inputProps.type,
			value: inputProps.defaultValue == "" ? "" : inputProps.defaultValue,
			placeholder: inputProps.placeholder,
			pattern: inputProps.pattern,
			min: inputProps.min,
			max: inputProps.max,
			onChange: this.localOnChange
		}
	}
	
	createErrorHtml() {
		const {props} = this
		if ((props.showError && props.inputProps.defaultValue != "") || (props.required && props.inputProps.defaultValue.trim() == "")) {
			let error = props.errorMsg ? props.errorMsg : props.required ? "This field is required!" : "Invalid Input"
			return (
				<h1 className="input__error">{error}</h1>
			)
		}
		return ""
	}
	
	render() {
		const {props} = this,
			id = this.handleOptional("id", null),
			label = props.label ? (
				<div className="input__label">
					<h1>{props.label}{props.required ? "*" : ""}</h1>
				</div>
			) : "",
			classes = this.handleOptional("classes", "input", true),
			newProps = this.handleNewProps(),
			errorMsg = this.createErrorHtml(),
			inputClasses = classNames({"input-error-border": errorMsg != ""})
		return (
			<div id={id} className={classes}>
				{label}
				<div className="input__field">
					<input className={inputClasses} {...newProps}/>
					{errorMsg}
				</div>
			</div>
		)
	}
}