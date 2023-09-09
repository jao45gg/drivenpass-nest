# Drivenpass

Design of a password guard application ! With the right to register, login, save password, credit card, debit card, note, and more !

Try it out now on https://drivenpass-1ohm.onrender.com <br/> <br/>
You can also check on the documentation for every route, and every DTO. It's done using swagger, and you can acess it on http://localhost:3000/api after running or [here](https://drivenpass-1ohm.onrender.com/api)

## About

This is the Back-end of Drivenpass web application ! Fell free to use and abuse it !

Below are the implemented features:

- Sign Up
- Login
- Save credit card
- Save debit card
- Save note
- Save passwords
- Dele data
- Update data
- Dele user with all data
- Much more !
  
By using this app any user can store lots of secret information with safety !

## Technologies
The following tools and frameworks were used in the construction of the project, you can find the full list on the package.json:<br>
<p>
  <img style='margin: 5px;' src='https://img.shields.io/badge/NestJS-E0234E.svg?style=for-the-badge&logo=NestJS&logoColor=white'>
  <img style='margin: 5px;' src="https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white"/>
   <img style='margin: 5px;' src="https://img.shields.io/badge/Prisma-2D3748.svg?style=for-the-badge&logo=Prisma&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=for-the-badge&logo=TypeScript&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/NPM-%23CB3837.svg?style=for-the-badge&logo=npm&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/.ENV-ECD53F.svg?style=for-the-badge&logo=dotenv&logoColor=black"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Jest-C21325.svg?style=for-the-badge&logo=Jest&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=for-the-badge&logo=ESLint&logoColor=white"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Prettier-F7B93E.svg?style=for-the-badge&logo=Prettier&logoColor=black"/>
  <img style='margin: 5px;' src="https://img.shields.io/badge/Swagger-85EA2D.svg?style=for-the-badge&logo=Swagger&logoColor=black"/>

  
</p>


## Installation

```bash
$ npm install
```
## Running the app

Create a .env.dev and .env.test file on the root of the project following .env.example
```bash
DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public"
JWT_SECRET=
CRYPT_SECRET=
```

Run prisma migrations, it will create all the database tables and configs
```bash
$ npm run dev:migration:run
$ npm run test:prisma
```
Use the following commands to run
```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - João Pedro Souza braga

## License

[MIT licensed](LICENSE).
