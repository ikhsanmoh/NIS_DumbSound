# Project Name

This is a project built with Express and Sequelize CLI.

## Requirements

- Node.js
- npm
- Express
- Sequelize CLI
- A local server (such as Apache or Nginx)

## Installation

1. Clone the repository.
2. Run `cd client && npm install` to install client dependencies.
3. Run `cd .. && cd server && npm install` to install server dependencies.
4. Update the configuration files (`config.js`) to set up your credentials, database details, URL, and port. Make sure the client and server configurations match.
5. Set up your local server (Apache or Nginx).
6. Create a brand new database with the same name as the database name in your configuration file.
7. Run `npx sequelize-cli db:migrate` to migrate database tables.
8. Run `npx sequelize-cli db:seed:all` to seed the database.
9. Run `npm run dev` to start the server.

## Usage

Once the server is running, you can access the application by visiting the URL specified in your configuration file.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.
