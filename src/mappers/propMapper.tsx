import * as React from 'react'

export const mapSectionPropsToState = (props: any) => {
	return React.Children.map(props, (child: any, index: any) => {
		return ({
			...child.props,
			index: index
		})
	})
}