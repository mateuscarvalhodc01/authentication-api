import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { MyReporter } from 'App/Validators/Reporter';

export default class ForgotPasswordValidator {
	constructor(protected ctx: HttpContextContract) {}

	public reporter = MyReporter;

	public schema = schema.create({
		email: schema.string({ trim: true }, [rules.email()]),
	});

	public messages = {
		'required': "O campo '{{ field }}' é obrigatório para autenticação.",
		'email.email': 'O e-mail precisa ser válido.',
	};
}
