import { schema, rules } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { MyReporter } from 'App/Validators/Reporter';

export default class SignupValidator {
	constructor(protected ctx: HttpContextContract) {}

	public reporter = MyReporter;

	public schema = schema.create({
		name: schema.string({ trim: true }),
		email: schema.string({ trim: true }, [
			rules.email(),
			rules.unique({ table: 'users', column: 'email' }),
		]),
		password: schema.string({}),
	});

	public messages = {
		'required': "O campo '{{ field }}' é obrigatório para cadastro.",
		'unique':
			"O campo '{{ field }}' já está cadastrado em um dos nossos usuários. Se você acha que isso é um erro, entre em contato com o suporte ",
		'email.email': 'O e-mail precisa ser válido.',
	};
}
