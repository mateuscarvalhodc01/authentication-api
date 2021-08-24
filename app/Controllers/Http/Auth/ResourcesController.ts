import User from 'App/Models/User';
import { SigninValidator, SignupValidator } from 'App/Validators/Auth';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class ResourcesController {
	async signIn({ request, auth, response }: HttpContextContract) {
		await request.validate(SigninValidator);
		try {
			const { email, password } = request.body();
			try {
				var data = await auth.use('api').attempt(email, password);
			} catch (error) {
				return response.status(401).json({ message: 'E-mail e/ou senha inválidos' });
			}
			const user = await User.findBy('email', email);
			return response.status(200).json({ data, user });
		} catch (error) {
			return response.status(500).json({ message: error.message });
		}
	}

	async signUp({ request, auth, response }: HttpContextContract) {
		await request.validate(SignupValidator);
		try {
			const { name, email, password } = request.body();
			const user = await User.create({ name, email, password });
			const data = await auth.use('api').attempt(email, password);
			return response.status(200).json({ user, data });
		} catch (error) {
			return response.status(500).json({ message: error.message });
		}
	}
}
