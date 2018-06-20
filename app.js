import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';


// ROUTES

dotenv.config();
const port = process.env.PORT;
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ROUTES CONFIG

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './client', 'index.html'));
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
