import { useState, useEffect } from 'react';
import './App.css';
import './index.css';

const apiUrl = 'http://localhost:3000/books';
function App() {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(apiUrl, { mode: 'cors' });
      const data = await response.json();
      setBook(data);
    };

    getData();
  }, []);

  function handleUpdatePages(bookId) {
    const apiUrlBook = `http://localhost:3000/books/${bookId}`;
    const inputPagesValue = document.getElementById(`actualPages-${bookId}`);

    fetch(apiUrlBook, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pagesRead: inputPagesValue.value,
      }),
    })
      .then((response) => response.json())
      .then((updatedBook) => {
        // Encuentra el índice del libro que se acaba de actualizar
        const bookIndex = book.findIndex((b) => b.id === updatedBook.id);

        // Crea una copia del estado actual de los libros
        const newBooks = [...book];

        // Reemplaza el libro actualizado en la copia del estado
        newBooks[bookIndex] = updatedBook;

        // Actualiza el estado de los libros
        setBook(newBooks);
      });

    inputPagesValue.value = '';
  }

  return (
    <section className='bg-slate-800 mb-60'>
      <h1 className='font-bold text-2xl justify-center flex m-2 text-white'>
        My Reading List
      </h1>
      <ul className='grid grid-cols-2 md:grid-cols-3  gap-2 justify-center text-center'>
        {book.map((book) => (
          <li key={book.id} className='hover:scale-105 transition'>
            <div className='flex items-center  w-full justify-center'>
              <div className='bg-slate-400 shadow-xl rounded-lg '>
                <h3 className='text-center text-xl text-gray-900 font-medium leading-8'>
                  {book.title}
                </h3>
                <div className='photo-wrapper p-2 md:items-center md:justify-center md:flex'>
                  <img src={book.image} alt={book.title} className='w-40  ' />
                </div>

                <p>Author - {book.author}</p>
                <p>Book Planet - {book.planet}</p>
                <div className='md:felx md:items-center'>
                  <progress
                    id='progresBar'
                    value={book.pagesRead}
                    max={book.totalPages}
                    className='text-white h-6  [&::-webkit-progress-bar]:rounded-md before::text-black [&::-webkit-progress-value]:rounded-md  [&::-webkit-progress-bar]:bg-slate-900 [&::-webkit-progress-value]:bg-green-400 [&::-moz-progress-bar]:bg-black-900  md:ml-2'></progress>
                  <input
                    type='text'
                    placeholder='Pages'
                    className='border  border-slate-600 rounded-lg text-center md:ml-2 text-black'
                    id={`actualPages-${book.id}`}
                  />
                </div>
                <div className='text-center my-3'>
                  <button
                    onClick={() => handleUpdatePages(book.id)}
                    className='bg-blue-500 hover:bg-blue-700 text-white mr-2  px-2 rounded w-full'>
                    Update
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {/* <ul className='grid grid-cols-2 md:grid-cols-3 ml-4 gap-2  mb-40'>
        {book.map((book) => (
          <li key={book.id} className=''>
            {book.title}
            <br />
            Author - {book.author}
            <br />
            Book Planet - {book.planet}
            <img src={book.image} alt={book.title} className='w-40 ' />
            <label htmlFor='progresBar'>{`${Math.round(
              (book.pagesRead / book.totalPages) * 100
            )}%`}</label>
            <progress
              id='progresBar'
              value={book.pagesRead}
              max={book.totalPages}
              className='text-white h-6 [&::-webkit-progress-bar]:rounded-md before::text-black [&::-webkit-progress-value]:rounded-md  [&::-webkit-progress-bar]:bg-slate-900 [&::-webkit-progress-value]:bg-green-400 [&::-moz-progress-bar]:bg-black-900 mt-2 md:ml-2'></progress>
            <input
              type='text'
              placeholder='Pages'
              className='border border-slate-600 rounded-lg text-center md:ml-2 text-black'
              id={`actualPages-${book.id}`}
            />
            <button
              onClick={() => handleUpdatePages(book.id)}
              className='bg-blue-500 hover:bg-blue-700 text-white m-2  px-2 rounded'>
              Update
            </button>
          </li>
        ))}
      </ul> */}
    </section>
  );
}

export default App;
