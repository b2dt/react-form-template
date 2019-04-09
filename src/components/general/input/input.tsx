import * as React from 'react'

import * as _ from 'lodash'
import {InputAttributes} from '../../../models/inputAttributes'

export interface InputProps {
	id?: string
	classes?: string
	label?: string
	error?: string
	debounceInput?: boolean
	debounceAmount?: number
	inputProps?: InputAttributes
}

export default class Input extends React.Component<InputProps, any> {
	constructor(props) {
		super(props)
		this.state = {
			fieldVal: ""
		}
		this.debounceOnChangeHandler = this.debounceOnChangeHandler.bind(this)
	}
	
	debounceOnChangeHandler(e) {
		const {props} = this
		this.setState({
			fieldVal: e.target.value
		})
		
		if (e.target.onchange == null) {
			props.debounceInput ? _.debounce(e.target.onChange, props.debounceAmount) : e.target.onchange
		}
	}
	
	handleOptional(prop: string, defaultValue: any = null, appendDefaultValue: boolean = false) {
		const {props} = this
		if (props.hasOwnProperty(prop)) {
			return appendDefaultValue ? `${props[prop]} ${defaultValue}` : props[prop]
		}
		return defaultValue
	}
	
	
	render() {
		const {props} = this,
			id = this.handleOptional("id", null),
			label = props.label ? (
				<div className="input__label">
					<h1>{props.label}</h1>
				</div>
			) : null,
			classes = this.handleOptional("classes", "input", true),
			error = this.handleOptional("error", "Invalid input")
		return (
			<div id={id} className={classes}>
				{label}
				<div className="input__field">
					<input onChange={this.debounceOnChangeHandler} {...props.inputProps}/>
					<h1 className="input__error">{error}</h1>
				</div>
			</div>
		)
	}
}