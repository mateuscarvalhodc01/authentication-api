import {
	ValidationException,
	MessagesBagContract,
	ErrorReporterContract,
} from '@ioc:Adonis/Core/Validator';

type ErrorNode = {
	message: string;
	field: string;
	rule: string;
};

export class MyReporter implements ErrorReporterContract<ErrorNode> {
	public hasErrors = false;
	private error: ErrorNode = {} as ErrorNode;

	constructor(private messages: MessagesBagContract, private bail: boolean) {}

	public report(
		pointer: string,
		rule: string,
		message: string,
		arrayExpressionPointer?: string,
		args?: any
	) {
		this.hasErrors = true;

		const errorMessage = this.messages.get(pointer, rule, message, arrayExpressionPointer, args);

		this.error.message = errorMessage;
		this.error.field = pointer;
		this.error.rule = rule;

		if (this.bail) {
			throw this.toError();
		}
	}

	public toError() {
		throw new ValidationException(false, this.toJSON());
	}

	public toJSON(): ErrorNode {
		return this.error;
	}
}
