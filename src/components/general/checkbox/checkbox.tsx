import * as React from 'react'
import classNames from 'classnames'
import {UpdateObj} from "../../../utility/formUtil";

export enum CheckboxState {
	CHECKED = 'CHECKED',
	UNCHECKED = 'UNCHECKED'
}

export interface CheckboxProps {
	id: string
	index: number
	label: string
	toggled: boolean
	onToggle: (input: UpdateObj) => any
}

export default class Checkbox extends React.Component<CheckboxProps, any> {
	
	constructor(props: CheckboxProps) {
		super(props);
		this.updateValue = this.updateValue.bind(this)
	}
	
	updateValue() {
		const {props} = this
		let fieldUpdateObj: UpdateObj = {
			fieldIndex: props.index,
			newVal: props.toggled ? CheckboxState.UNCHECKED : CheckboxState.CHECKED
		}
		props.onToggle(fieldUpdateObj)
	}
	
	render() {
		const {props} = this,
			checkboxClasses = classNames("checkbox", {"toggled": props.toggled})
		return (
			<div id={props.id} className={checkboxClasses} onClick={this.updateValue}>
				<div className="checkbox__label">
					<h1>{props.label}</h1>
				</div>
				<div className="checkbox__field">
					<i className="far fa-check-circle checkbox__field-icon no"/>
					<i className="fas fa-check-circle checkbox__field-icon yes"/>
				</div>
			</div>
		)
	}
}