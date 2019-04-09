import * as React from 'react'

export interface TextAreaProps {
	id: string
	label: string
	value: string
	error?: string
	maxLength?: number
	
	onChange: (e: any) => any
}

export default class TextArea extends React.Component<TextAreaProps, any> {
	render() {
		const {props} = this,
			error = props.error ? props.error : "Invalid input"
		return (
			<div id={props.id} className="text-area">
				<div className="text-area__label">
					<h1>{props.label}</h1>
				</div>
				<div className="text-area__field">
					<textarea className="scroll-bar light"
										value={props.value}
										onChange={props.onChange}
										maxLength={props.maxLength}/>
					<h1 className="text-area__error">{error}</h1>
				</div>
			</div>
		)
	}
}