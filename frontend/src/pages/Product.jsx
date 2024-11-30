import React from 'react'
import productSample from '../assets/products.json'
import cheetos from '/cheetos.png'
import Navbar from '../components/Navbar'

const Product = () => {
    return (
        <div>
            <Navbar/>
        <div className='md:mx-10 md:my-5 my-2 mx-2'>
            <div className='grid md:grid-cols-5 gap-4 sm:grid-cols-3 grid-cols-2'>
            {productSample.map((p, i) => (
                <div key={i} className='border-2 border-pink-500 px-2 py-4 hover:scale-95 hover:bg-pink-500 duration-150 rounded-lg cursor-pointer'>
                    <div className='flex items-center justify-center '>
                        <p className='font-semibold pb-4'>{p.name}</p>
                    </div>
                    <img src={cheetos} alt="" />
                    <div className='text-center'>{p.categories}</div>
                </div>
            ))
            }
            </div>
        </div>
        </div>
    )
}




export default Product
