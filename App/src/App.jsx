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

  function handleUpdatePages() {
    const apiUrlBook = 'http://localhost:3000/books/:id';
    const inputPagesValue = document.getElementById('actualPages');

    fetch(apiUrlBook, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pagesRead: inputPagesValue.value,
      }),
    });
  }

  return (
    <>
      <h1 className='font-bold text-2xl justify-center flex'>
        My Reading List
      </h1>
      <ul className='grid grid-cols-2 md:grid-cols-3 ml-4 gap-2  mb-40'>
        {book.map((book) => (
          <li key={book.id} className=''>
            {book.title}
            <br />
            Author - {book.author}
            <br />
            Book Planet - {book.planet}
            <img src={book.image} alt={book.title} className='w-40 ' />
            <progress
              value={book.pagesRead}
              max={book.totalPages}
              className='[&::-webkit-progress-bar]:rounded-md [&::-webkit-progress-value]:rounded-lg   [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-value]:bg-green-400 [&::-moz-progress-bar]:bg-black-900 mt-2 md:ml-2'></progress>
            <input
              type='text'
              placeholder='Pages'
              className='border border-slate-600 rounded-lg text-center md:ml-2'
              id='actualPages'
            />
            <button
              onClick={handleUpdatePages}
              className='bg-blue-500 hover:bg-blue-700 text-white m-2  px-2 rounded'>
              Update
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
