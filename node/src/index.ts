import express, { Application } from 'express';
import bodyParser from 'body-parser';
import sequelize from './config';
import postRoutes from './routes/postRoutes';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/posts', postRoutes);

sequelize.sync()
.then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on http://localhost:${PORT}`);
	});
})
.catch((error) => console.error('Unable to connect to the database:' , error));
