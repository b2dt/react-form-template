import * as React from 'react'

export const mapSectionPropsToState = (props: any) => {
	return React.Children.map(props, (child: any, index: any) => {
		return ({
			...child,
			index: index
		})
	})
}

/*
React.Children.map(props.children, (child: any, index: any) => {
						return (
							<FormSection
								title={child.props.title}
								inputsPerRow={child.props.inputsPerRow}
								formFields={child.props.formFields}
								index={index}
								updateFieldValue={this.updateFieldValue}
							/>
						)
 */