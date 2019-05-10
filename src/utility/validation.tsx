import Validator from "validator"

export enum ValidationType {
	Zip = "zip",
	Phone = "phone",
	Email = "email",
	Required = "required",
}

export const Validate: any = {
	zipCode: (zipCd: string) => Validate.isEmpty(zipCd) || RegExp("^[0-9]{5}(?:-[0-9]{4})?$").test(zipCd),
	phone: (input: string): boolean => {
		return Validate.isEmpty(input) || Validator.isMobilePhone(input, "en-US");
	},
	email: (input: string): boolean => {
		return Validate.isEmpty(input) || Validator.isEmail(input);
	},
	required: (input: string): boolean => {
		return input !== undefined && input !== null && input.trim() !== "";
	},
	isEmpty: (input: string): boolean => {
		return input == undefined || input.trim() == ""
	},
	determineIfError: (value: any, validate: Function) => {
		if (validate !== undefined && validate !== null) {
			return !validate(value);
		}
		return false;
	}
}