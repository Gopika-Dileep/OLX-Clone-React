import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Favorite from '../../assets/favorite.svg'


const Card = ({ items }) => {
  const [visibleCount, setVisibleCount] = useState(8);

  const handleViewMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <div className='p-10 px-2 sm:px-20 md:px-10 lg:px-32 min-h-screen'>

      <h1 style={{ color: '#002f34' }} className="text-2xl font-semibold mb-6">Fresh recommendations</h1>

      <div className='grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {items.slice(0, visibleCount).map((item) => (
          <Link
            to={'/details'}
            state={{ item }}
            key={item.id}
            className="hover:shadow-lg transition-shadow duration-200"
            style={{ borderWidth: '1px', borderColor: 'lightgrey', borderRadius: '16px', background: '#fff' }}
          >
            <div
              className='relative w-full h-80 rounded-xl border border-gray-200 bg-white overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-shadow duration-200'
            >

              {/* Display Images */}
              <div className='w-full flex justify-center items-center  h-40 overflow-hidden'>
                <img
                  className='h-36 object-contain'
                  src={item.imageUrl || 'https://via.placeholder.com/150'}
                  alt={item.title}
                />
                <div className='absolute flex justify-center items-center p-2 bg-white rounded-full top-3 right-3 cursor-pointer shadow'>
                  <img className='w-5' src={Favorite} alt="Favorite" />
                </div>
              </div>

              {/* Display details */}
              <div className='flex flex-col flex-1 p-4'>
                <h1 style={{ color: '#002f34' }} className="font-bold text-lg mb-1 truncate">₹ {item.price}</h1>
                <p className="text-xs text-gray-500 mb-1">{item.category}</p>
                <p className="font-semibold text-gray-800 mb-2 truncate">{item.title}</p>
                <p className="text-sm text-gray-600 line-clamp-2 mb-2">{item.description || "No description provided."}</p>
                {/* Optionally, add more info here */}
              </div>
            </div>
          </Link>
        ))}
      </div>
      {visibleCount < items.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleViewMore}
            className="px-6 py-2 bg-teal-600 text-white rounded-full shadow hover:bg-teal-700 transition"
          >
            View More
          </button>
        </div>
      )}
    </div>
  )
}

export default Card