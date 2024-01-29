import React from 'react';

export default function BookCard() {
  return (
    <ul className='grid grid-cols-2 md:grid-cols-3 ml-4 gap-2  mb-40'>
      {book.map((book) => (
        <li key={book.id} className=''>
          <div className='flex items-center h-screen w-full justify-center'>
            <div className='max-w-xs'>
              <div className='bg-white shadow-xl rounded-lg py-3'>
                <div className='photo-wrapper p-2'>
                  <img src={book.image} alt={book.title} className='w-40 ' />
                </div>
                <div className='p-2'>
                  <h3 className='text-center text-xl text-gray-900 font-medium leading-8'>
                    {book.title}
                  </h3>
                  <div className='text-center text-gray-400 text-xs font-semibold'>
                    <p>Author - {book.author}</p>
                  </div>
                  <table className='text-xs my-3'>
                    <tbody>
                      <tr>
                        <td className='px-2 py-2 text-gray-500 font-semibold'>
                          Book Planet - {book.planet}
                        </td>
                        <td className='px-2 py-2'>
                          <progress
                            id='progresBar'
                            value={book.pagesRead}
                            max={book.totalPages}
                            className='text-white h-6 [&::-webkit-progress-bar]:rounded-md before::text-black [&::-webkit-progress-value]:rounded-md  [&::-webkit-progress-bar]:bg-slate-900 [&::-webkit-progress-value]:bg-green-400 [&::-moz-progress-bar]:bg-black-900 mt-2 md:ml-2'></progress>
                        </td>
                      </tr>
                      <tr>
                        <td className='px-2 py-2 text-gray-500 font-semibold'>
                          <input
                            type='text'
                            placeholder='Pages'
                            className='border border-slate-600 rounded-lg text-center md:ml-2 text-black'
                            id={`actualPages-${book.id}`}
                          />
                        </td>
                        <td className='px-2 py-2'>+977 9955221114</td>
                      </tr>
                    </tbody>
                  </table>

                  <div className='text-center my-3'>
                    <button
                      onClick={() => handleUpdatePages(book.id)}
                      className='bg-blue-500 hover:bg-blue-700 text-white m-2  px-2 rounded'>
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
