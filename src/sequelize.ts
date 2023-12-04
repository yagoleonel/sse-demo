// initSequelize.ts
import { Sequelize } from 'sequelize';
import { Message } from './models/message';
import { Subscription } from './models/subscription';


const sequelize = new Sequelize(process.env.MYSQL_DATABASE!, process.env.MYSQL_USER!, process.env.MYSQL_PASSWORD, {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    port: 3306
});

// Define models
Subscription.define(sequelize);
Message.define(sequelize);

// Sync the database and create the User table
sequelize.sync({ force: true })
.then(() => {
  console.log('Database synchronized successfully.');
})
.catch((error) => {
  console.error('Error syncing database:', error);
})

export { sequelize, Message, Subscription };
