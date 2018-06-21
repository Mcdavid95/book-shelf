import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './server/routes';

// ROUTES

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES CONFIG

app.use('/api/v1', routes);

app.get('*', (req, res) => {
  res.status(200).send({
    message: 'welcome to valhalla'
  });
});
// If no route is matched return a 404
app.use((req, res, next) => {
  res.status(501).send({
    status: false,
    message: 'Sorry, this endpoint is not supported by this API.'
  });
  next();
});

export default app;
