import * as React from 'react'
import {InputAttributes} from '../../../models/inputAttributes'

export interface InputProps {
	id?: string
	index?: number
	classes?: string
	label?: string
	error?: string
	debounceInput?: boolean
	debounceAmount?: number
	inputProps?: InputAttributes
	
	updateFormList?: (x: any, y: any) => any
}

export default class Input extends React.Component<InputProps, any> {
	constructor(props) {
		super(props)
		this.localOnChange = this.localOnChange.bind(this)
		this.handleNewProps = this.handleNewProps.bind(this)
		this.state = {
			value: ""
		}
	}
	
	localOnChange(e) {
		const value = e.target.value,
			{props} = this
		this.setState({
			value: value
		})
		this.props.updateFormList(value, props.index)
	}
	
	handleOptional(prop: string, defaultValue: any = null, appendDefaultValue: boolean = false) {
		const {props} = this
		if (props.hasOwnProperty(prop)) {
			return appendDefaultValue ? `${props[prop]} ${defaultValue}` : props[prop]
		}
		return defaultValue
	}
	
	handleNewProps() {
		const {props, state} = this,
			{inputProps} = props
		return {
			type: inputProps.type,
			value: inputProps.value,
			defaultValue: inputProps.defaultValue,
			placeholder: inputProps.placeholder,
			pattern: inputProps.pattern,
			min: inputProps.min,
			max: inputProps.max,
			onChange: this.localOnChange
		}
	}
	
	
	render() {
		const {props, state} = this,
			id = this.handleOptional("id", null),
			label = props.label ? (
				<div className="input__label">
					<h1>{props.label}</h1>
				</div>
			) : null,
			classes = this.handleOptional("classes", "input", true),
			error = this.handleOptional("error", "Invalid input"),
			newProps = this.handleNewProps()
		return (
			<div id={id} className={classes}>
				{label}
				<div className="input__field">
					<input {...newProps}/>
					<h1 className="input__error">{error}</h1>
				</div>
			</div>
		)
	}
}