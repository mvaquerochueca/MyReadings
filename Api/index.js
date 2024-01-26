import express from 'express';
import cors from 'cors';
import BOOKS from './Books.js';

const app = express();

app.use(express.json());
app.use(cors());

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

app.get('/books', (req, res) => {
  res.json(BOOKS);
});

app.get('/books/:id', (req, res) => {
  const id = req.params.id;
  const book = BOOKS.find((book) => book.id === +id);
  res.json(book);
});

app.post('/books', (req, res) => {
  const data = req.body;
  const newBook = {
    id: BOOKS.length + 1,
    ...data,
  };
  BOOKS.push(newBook);
  res.status(201).send('Created');
  res.json(newBook);
});

app.patch('/books/:id', (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const book = BOOKS.find((book) => book.id === Number(id));
  const index = BOOKS.indexOf(book);
  const updatedBook = { ...book, ...data };
  BOOKS[index] = updatedBook;
  res.json(updatedBook);
});
