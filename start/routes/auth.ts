import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  /**
   * ROTAS RELACIONADOS A AUTENTICAÇÃO
   * 1. Login
   * 2. Cadastro de usuários
   */
  Route.post('auth/signin', 'ResourcesController.signIn') // 1
  Route.post('auth/signup', 'ResourcesController.signUp') // 2

  /**
   * ROTAS RELACIONADAS A SENHA
   * 2. Esqueci minha senha (Enviar e -mail para usuário)
   * 3. Validar código
   * 4. Recuperar a senha
   */
  Route.post('auth/forgot-password', 'PasswordsController.forgotPassword') // 2
  Route.post('auth/validate-code', 'PasswordsController.validateCode') // 3
  Route.post('auth/reset-password', 'PasswordsController.resetPassword') // 4
})
  .prefix('v1')
  .namespace('App/Controllers/Http/Auth')
