import {InputType, ValidationType} from "react-lightning-form";

const requestTypes: string[] = [
	"Non-Renewal",
	"Decline",
	"60-Day Cancellation",
	"Midterm Cancellation",
	"Foreclosure",
	"Death of Named Insured",
	"Other"
]

const cancelReasons: string[] = [
	"Transfer",
	"Ineligible",
	"MVR",
	"Insured's Request",
	"Claims Experience",
	"Non-Pay",
	"Other",
	"Bad Check",
	"Out of Area",
	"Lacking Information",
	"ADM Cancellation",
	"Questionnaire",
	"Misrepresentation",
	"Clue"
]

export const Test = {
	searchPolicyNum: {
		searchCriteria: {value: "23-71-12305670-001"},
		submitSearch: {type: InputType.Checkbox},
		resultDisplay: {value: "stuff", type: InputType.TextArea, validate: ValidationType.Required}
	},
	information: {
		requestType: {value: "", type: InputType.Dropdown, options: requestTypes},
		daysNotice: {value: ""},
		terminationReason: {value: "", type: InputType.Dropdown, options: cancelReasons},
		notesToAssociate: {value: "stuff", type: InputType.TextArea, validate: ValidationType.Required, column: 1},
		variables: {value: "stuff", type: InputType.TextArea, validate: ValidationType.Required},
		confidentialInfo: {
			value: "",
			title: "Confidential Info for the Agent (Z600)",
			type: InputType.TextArea,
			validate: ValidationType.Required
		}
	}
	
}

/*
name: {
		firstName: {value: "Billy", validate: ValidationType.Required},
		middleName: {value: "Bob"},
		lastName: {value: "Smith", validate: ValidationType.Required},
		suffix: {value: "", type: InputType.Dropdown, options: suffixOptions, validate: ValidationType.Required}
	},
	contact: {
		phoneNumber: {value: "(314) 780-5555", validate: ValidationType.Phone},
		emailAddress: {value: "my-email@gmail.com", validate: ValidationType.Email},
		primaryContact: {value: false, type: InputType.Checkbox}
	}
 */