# Authentication - Node.Js (Adonis v5)

## Conteúdo

- [Veja na prática](#demo)
- [Sobre](#about)
- [Iniciando](#getting_started)
- [Utilização](#usage)
- [Autor](../CONTRIBUTING.md)

## Veja na prática <a name = "demo"></a>

- [DEMONSTRAÇÃO](https://mateuscarvalho.codecompany.app/authentication)

## Sobre <a name = "about"></a>

Este é um projeto de portfólio com módulo de autenticação completo:

- Login - Autentica um usuário com o método JWT API TOKEN
- Cadastro - Cadastra um novo usuário no banco de dados.
- Esqueci minha senha - Envia um e-mail com um código de utilização único e válido por 10 minutos.
- Logout - Revoga o token

## Iniciando <a name = "getting_started"></a>

Estas instruções tem como objetivo auxiliar a rodar o projeto na sua máquina local (localhost) para ambiente de desenvolvimento e testes. Visite a documentação ofical do AdonisJs para visualizar as instruções de deploy em produção.

### Pré Requisitos

Ferramentas que você precisa ter instaladas em seu computador para rodar este projeto. Não ensinaremos neste guia como instalá-las, mas você pode buscá-las diretamente na documentação oficial de cada ferramenta.

- Node.Js - v14+
- Npm - v6+
- PostgreSQL v10+

### Instalação

APÓS CLONAR ESTE PROJETO, INSTALE TODAS AS DEPENDÊNCIAS NODE

```
$ npm install
```

CRIE UM ARQUIVO '.env' NA RAIZ DO PROJETO E PREENCHA-O DE ACORDO COM ESTE .env DE EXEMPLO

```
PORT=3333
HOST=0.0.0.0
NODE_ENV=development
APP_KEY=
DB_CONNECTION=pg
PG_HOST=localhost
PG_PORT=5432
PG_USER=
PG_PASSWORD=
PG_DB_NAME=authentication_db
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=
SMTP_PASSWORD=
CACHE_VIEWS=false

```

PARA GERAR UM APP KEY, EXECUTE O SEGUINTE COMANDO:

```
$ node ace generate:key
```

TODAS AS VARIÁVEIS DE AMBIENTE SÃO OBRIGATÓRIAS PARA O FUNCIONAMENTO CORRETO DO APLICATIVO.

APÓS PREENCHER TODAS AS VARIÁVEIS DE AMBIENTE, EXECUTE A MIGRATION PARA MONTAR O BANCO DE DADOS

```
$ node ace migration:run
```

E FINALMENTE EXECUTE O SEU APLICATIVO COM O COMANDO:

```
$ npm run dev
```

OU

```
$ yarn dev
```

## Utilização <a name = "usage"></a>

Este projeto tem como objetivo apenas apresentação em meu portfólio pessoal e como objeto de estudos para outros desenvolvedores.

## Autor
[@mateuscarvalhodc01](https://github.com/mateuscarvalhodc01)
