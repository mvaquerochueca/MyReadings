import express from 'express';
import cors from 'cors';
import COSMERE from './Cosmere.js';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

app.get('/cosmere', (req, res) => {
  res.json(COSMERE);
});

app.get('/cosmere/:id', (req, res) => {
  const id = req.params.id;
  const cosmere = COSMERE.find((cosmere) => cosmere.id === +id);
  res.json(cosmere);
});

app.post('/cosmere', (req, res) => {
  const data = req.body;
  const newBook = {
    id: COSMERE.length + 1,
    ...data,
  };
  COSMERE.push(newBook);
  res.status(201).send('Created');
  res.json(newBook);
});
