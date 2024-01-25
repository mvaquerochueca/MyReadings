import { useState, useEffect } from 'react';
import './App.css';
import './index.css';

const apiUrl = 'http://localhost:3000/cosmere';
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

  return (
    <>
      <h1 className='font-bold text-2xl justify-center flex'>Cosmere</h1>
      <ul className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {book.map((cosmere) => (
          <li key={cosmere.id}>
            Title - {cosmere.title}
            <br />
            Author - {cosmere.author}
            <br />
            Cosmere Planet - {cosmere.planet}
            <img src={cosmere.image} alt={cosmere.title} className='w-40 ' />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
