'use strict';

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import Mail from '@ioc:Adonis/Addons/Mail';
import Env from '@ioc:Adonis/Core/Env';

import User from 'App/Models/User';
import ResetedPassword from 'App/Models/ResetedPassword';

import {
	ForgotPasswordValidator,
	ValidateCodeValidator,
	ResetPasswordValidator,
} from 'App/Validators/Auth';

class PasswordController {
	async forgotPassword({ request, response }: HttpContextContract) {
		await request.validate(ForgotPasswordValidator);
		try {
			const { email } = request.body();
			try {
				var user = await User.findByOrFail('email', email);
			} catch (error) {
				return response.status(400).json({ message: 'Nenhum usuário com este e-mail encontrado.' });
			}
			const resetedInfo = await ResetedPassword.create({ email });
			/**
			 * Lógica para gerar um código aleatório de 6 dígitos.
			 * 1 - Pega os 03 primeiro dígitos do ID
			 * 2 - Define o tamanho do código para concatenar com o ID para que o código tenha o tamanho de 06 caracteres
			 * 3 - Gera um número aleatório e pega a quantidade necessária para formar um código de 06 caractéres
			 * 4 - Concatena os primeiros dígitos do ID com o Código aleatório gerado.
			 */
			const id = resetedInfo.id.toString().substr(0, 3); //1
			const length = 6 - id.length; //2
			const code = (Math.random() * 1000000).toString().substr(0, length); //3
			resetedInfo.code = id + code; //4

			await resetedInfo.save();

			await Mail.send((message) => {
				message
					.from('mateus.carvalho@codecompany.app', 'Authentication - Code Company')
					.to(email)
					.subject('Recuperação de senha')
					.htmlView('emails/forgot_password', {
						primaryColor: '#00acd7',
						secondaryColor: '#2380d7',
						logoUrl: `${Env.get('BASE_URL')}/assets/images/logo.png`,
						user: {
							name: user.name,
						},
						code: resetedInfo.code,
						companyName: 'Authentication - Code Company',
					});
			});
			return { message: 'Email enviado com sucesso.' };
		} catch (error) {
			return response.status(500).send({ message: error.message });
		}
	}

	async validateCode({ request, response }: HttpContextContract) {
		await request.validate(ValidateCodeValidator);
		const { code, email } = request.body();
		try {
			const requested = await ResetedPassword.query()
				.where('code', code)
				.andWhere('email', email)
				.firstOrFail();

			if (!requested.available) {
				return response.status(400).send({ message: 'Este código já foi utilizado.' });
			}

			/**
			 * LÓGICA PARA COMPARAR A DATA DE EXPIRAÇÃO COM A DATA ATUAL DA SOLICITAÇÃO.
			 *
			 * 1. Pega a data de criação da solicitação, adiciona 10 minutos, transforma para o timezone UTC e pega o valor em ms
			 * 2. Pega a data atual com o valor em ms.
			 * 3. Se o valor da data atual for maior que a data de expiração, retorna um erro.
			 */
			const expiresTime = requested.createdAt.plus({ minutes: 10 }).toUTC().valueOf(); //1
			const nowTime = new Date().valueOf(); //2
			if (nowTime > expiresTime)
				return response.status(401).send({
					message:
						'Seu link expirou, após solicitar a redefinição de senha voce tem até 10 minutos para concluí-la',
				}); //3

			return requested;
		} catch (error) {
			return response.status(404).send({ message: 'Código e/ou email inválido' });
		}
	}

	async resetPassword({ request, response }: HttpContextContract) {
		await request.validate(ResetPasswordValidator);
		const { password, id, code } = request.body();

		try {
			var requested = await ResetedPassword.query()
				.where('id', id)
				.andWhere('code', code)
				.firstOrFail();
			if (!requested.available) {
				return response.status(400).send({ message: 'Este código já foi utilizado.' });
			}
		} catch (error) {
			return response
				.status(404)
				.send({ message: 'Solicitação não encontrada, verifique o id e o código informado.' });
		}

		try {
			const user = await User.findByOrFail('email', requested.email);
			user.password = password;
			await user.save();
			requested.available = false;
			await requested.save();

			return { message: 'Senha redefinida com sucesso, faça login para continuar.' };
		} catch (error) {
			return response
				.status(500)
				.send({ message: 'Houve um erro interno, entre em contato com o nosso suporte.' });
		}
	}
}

module.exports = PasswordController;
