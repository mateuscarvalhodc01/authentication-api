import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { MyReporter } from 'App/Validators/Reporter';

export default class ValidateCodeValidator {
	constructor(protected ctx: HttpContextContract) {}

	public reporter = MyReporter;

	public schema = schema.create({
		email: schema.string({ trim: true }, [rules.email()]),
		code: schema.string({ trim: true }, [rules.minLength(6), rules.maxLength(6)]),
	});

	public messages = {
		'required': "O campo '{{ field }}' é obrigatório para autenticação.",
		'email.email': 'O e-mail precisa ser válido.',
		'code.minLength': 'O código precisa ter 6 dígitos',
		'code.maxLength': 'O código precisa ter 6 dígitos',
	};
}
