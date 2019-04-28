import {InputType} from "../utility/formUtil";

export interface FormFieldProps {
    id: string
    inputType: InputType | any
    label?: string
    index: number

    sectionIndex?: number
    value?: string
    required?: boolean
    validation?: any
    errorMsg?: string
    defaultText?: string
    placeholder?: string
}