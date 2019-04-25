import * as React from "react";
import {FormFieldProps} from "../models/formFieldProps";
import {ColumnRange} from "../models/columnRange";
import classNames from 'classnames'
import Input from "../components/general/input/input";
import * as _ from 'lodash'
import {InputType} from "./validation";

export const sortFieldProps = (formFields: FormFieldProps[]) => {
	return _.sortBy(formFields, (field) => field.index)
}

export const convertFormFieldPropsToInputs = (formFields: FormFieldProps[], numOfColumns: ColumnRange, updateFieldVal: any) => {
	let sortedFormFields = sortFieldProps(formFields)
	return sortedFormFields.map(field => (convert(field, numOfColumns, updateFieldVal)))
}

const convert = (formProp: FormFieldProps, numOfColumns: ColumnRange, updateFieldVal: any) => {
	let columnClassName = classNames({"col-one": numOfColumns == ColumnRange.ONE}, {"col-two": numOfColumns == ColumnRange.TWO}, {"col-three": numOfColumns == ColumnRange.THREE})
	
	if (formProp.inputType == InputType.Text)
		return convertToTextBox(formProp, columnClassName, updateFieldVal)
	else if (formProp.inputType == InputType.Button)
		return convertToButton(formProp, columnClassName, updateFieldVal)
	else if (formProp.inputType == InputType.Dropdown)
		return convertToDropdown(formProp, columnClassName, updateFieldVal)
	else if (formProp.inputType == InputType.TextArea)
		return convertToTextArea(formProp, columnClassName, updateFieldVal)
	else if (formProp.inputType == InputType.Checkbox)
		return convertToCheckbox(formProp, columnClassName, updateFieldVal)
}

const convertToCheckbox = (buttonProps: FormFieldProps, columnClassName: string, updateFieldVal: any) => {
	let classes = classNames("form-text-input", columnClassName)
	
}

const convertToTextBox = (textProps: FormFieldProps, columnClassName: string, updateFieldVal: any) => {
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
}

const convertToButton = (buttonProps: FormFieldProps, columnClassName: string, updateFieldVal: any) => {
	let classes = classNames("form-text-input", columnClassName)
	
	
}

const convertToDropdown = (dropdownProps: FormFieldProps, columnClassName: string, updateFieldVal: any) => {
	let classes = classNames("form-text-input", columnClassName)
	
	
}

const convertToTextArea = (textAreaProps: FormFieldProps, columnClassName: string, updateFieldVal: any) => {
	let classes = classNames("form-text-input", columnClassName)
}