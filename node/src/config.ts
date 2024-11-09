import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('my_database', 'my_user', 'my_password', {
	host: 'localhost',
	dialect: 'postgres',
});

export default sequelize;
