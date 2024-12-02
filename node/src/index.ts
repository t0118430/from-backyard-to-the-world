import express, { Application } from 'express';
import bodyParser from 'body-parser';
import { AppDataSource } from './config';
import postRoutes from './routes/PostController';

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/posts', postRoutes);

AppDataSource.initialize()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.error('Unable to connect to the database:', error));
