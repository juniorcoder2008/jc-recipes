import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import getRecipesRouter from './routes/getRecipes.js';
import createRecipesRouter from './routes/createRecipes.js';

dotenv.config();

const app = express();

app.use(cors());

app.use('/get-recipes', getRecipesRouter);
app.use('/create-recipes', createRecipesRouter);

app.use(bodyParser({ limit: '30md', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30md', extended: true }));

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('MongoDB has connected succesfully!');

  app.listen(PORT, () => {
    console.log('Backend is running on http://localhost:' + PORT);
  });
}).catch(err => {
  console.log(err.message);
});