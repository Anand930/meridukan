import React from 'react'
import Navbar from '../components/Navbar'
import cheetos from '../../public/cheetos.png'

const Product = () => {
  return (
    <div>
      <Navbar />
      <div className='mx-2 my-2 md:flex gap-5'>
        <div className=' w-full flex item-center justify-center md:w-3/5 lg:w-1/2 border-2 border-pink-500 rounded-xl'>
          <img className='w-full px-10 py-10' src={cheetos} alt="" />
        </div>
        <div className=' w-full md:w-2/5 lg:w-1/2'>
          <div className='flex w-full items-center justify-center'>
            <p className='w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg'>Product Name</p>
            <p className='w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg'>Cheetos</p>
          </div>
          <div className='flex mt-3'>
          <p className='w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg '>product description</p>
          <p className='w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Suscipit minima accusantium dolorum doloribus beatae placeat perspiciatis totam molestias officiis error, minus neque rerum.</p>
          </div>
          <div className='flex mt-3'>
          <p className='w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg '>Cost price</p>
          <p className='w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg'> 10</p>
          </div>
          <div className='flex mt-3'>
          <p className='w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg '>Selling price</p>
          <p className='w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg'> 15</p>
          </div>
          <div className='flex mt-3'>
          <p className='w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg '>Available Quantity</p>
          <p className='w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg'> 60</p>
          </div>
          <div className='flex mt-3'>
          <p className='w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg '>Expiry Date</p>
          <p className='w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg'> 25-06-2027</p>
          </div>
          <div className='flex mt-3'>
          <p className='w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg '>Quantity to sell</p>
          <input className='w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg outline-none' type="number" />
          </div>
          <div className='flex mt-3'>
          <p className='w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg '>Customer to sell</p>
          <input className='w-1/2 min-h-14 border-2 border-pink-500 text-center flex items-center justify-center rounded-lg outline-none' type="number" />
          </div>

          <button className='w-full border-2 border-pink-500 text-center flex items-center justify-center rounded-lg mt-8 h-40 text-4xl text-pink-600 hover:bg-pink-600 hover:text-white'>
            Click Here to Sell it
          </button>
          
        </div>
      </div>
    </div>
  )
}

export default Product
