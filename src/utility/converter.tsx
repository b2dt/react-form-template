import * as React from "react";
import {FormFieldProps} from "../models/formFieldProps";
import {ColumnRange} from "../models/columnRange";
import classNames from 'classnames'
import Input from "../components/general/input/input";
import * as _ from 'lodash'
import {FormUtil, InputType} from "./formUtil";
import FormSection, {FormSectionProps} from "../components/formSection/formSection";

export const sortFieldProps = (formFields: FormFieldProps[]) => {
	return _.sortBy(formFields, (field) => field.index)
}

export const Convert: any = {
	formFields: (formFields: FormFieldProps[], numOfColumns: ColumnRange, updateFieldVal: any) => {
		let sortedFormFields = sortFieldProps(formFields)
		return sortedFormFields.map(field => (Convert.convert(field, numOfColumns, updateFieldVal)))
	},
	to: {
		sections: (formSectionProps: FormSectionProps[] | JSX.Element[]) => {
			let returnElements = []
			formSectionProps.forEach((props, index) => {
				if (props.formSectionValues != undefined) {
					let newSections = Convert.to.sections(props.formSectionValues)
					returnElements.push(
						<FormSection {...props} key={index}>
							{newSections}
						</FormSection>
					)
				} else {
					returnElements.push(Convert.to.section(props, index))
				}
			})
			return returnElements
		},
		section: (props: FormSectionProps | any, index: number) => {
			if (FormUtil.typecheck.formSection(props)) {
				return (
					<FormSection {...props} key={index}/>
				)
			} else {
				return props
			}
		},
		checkbox: (buttonProps: FormFieldProps, columnClassName: string, updateFieldVal: any) => {
			let classes = classNames("form-text-input", columnClassName)
			return
		},
		input: (textProps: FormFieldProps, columnClassName: string, updateFieldVal: any) => {
			let classes = classNames('field', columnClassName)
			return (
				<div className={classes} key={textProps.id}>
					<Input
						id={textProps.id}
						classes={"form-text-input"}
						label={textProps.label}
						index={textProps.index}
						updateFieldValue={updateFieldVal}
						inputProps={{
							type: "text",
							placeholder: textProps.placeholder,
							defaultValue: textProps.defaultText || ""
						}}
					/>
				</div>
			)
		},
		button: (buttonProps: FormFieldProps, columnClassName: string, updateFieldVal: any) => {
			let classes = classNames("form-text-input", columnClassName)
		},
		dropdown: (dropdownProps: FormFieldProps, columnClassName: string, updateFieldVal: any) => {
			let classes = classNames("form-text-input", columnClassName)
		},
		textarea: (textAreaProps: FormFieldProps, columnClassName: string, updateFieldVal: any) => {
			let classes = classNames("form-text-input", columnClassName)
		}
	},
	convert: (formProp: FormFieldProps, numOfColumns: ColumnRange, updateFieldVal: any) => {
		let columnClassName = classNames({"col-one": numOfColumns == ColumnRange.ONE}, {"col-two": numOfColumns == ColumnRange.TWO}, {"col-three": numOfColumns == ColumnRange.THREE})
		if (formProp.inputType == InputType.INPUT)
			return Convert.to.input(formProp, columnClassName, updateFieldVal)
		else if (formProp.inputType == InputType.BUTTON)
			return Convert.to.button(formProp, columnClassName, updateFieldVal)
		else if (formProp.inputType == InputType.DROPDOWN)
			return Convert.to.dropdown(formProp, columnClassName, updateFieldVal)
		else if (formProp.inputType == InputType.TEXTAREA)
			return Convert.to.textarea(formProp, columnClassName, updateFieldVal)
		else if (formProp.inputType == InputType.CHECKBOX)
			return Convert.to.checkbox(formProp, columnClassName, updateFieldVal)
	}
}
