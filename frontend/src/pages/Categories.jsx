import React from 'react'
import Card from '../components/Card'
import ProductSlide from '../components/ProductSlide'
import productSample from '../assets/products.json'
import cheetos from '/cheetos.png'

import Navbar from '../components/Navbar'

const Categories = () => {
    let Categories = []
    productSample.map((item, i) => {
        Categories.push(item.categories)
        return Categories
    })
    return (
        <div className='bg-gray-50 min-h-full min-h-full'>
            <Navbar />
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 py-2 px-5 gap-2 '>
                {Categories.map((categ, i) => (
                    <div key={i} className='border-2 border-pink-500 px-2 py-4 hover:scale-95 hover:bg-pink-500 duration-150 rounded-lg cursor-pointer'>
                        <div className='flex items-center justify-center '>
                            <p className='font-semibold pb-4'>{categ}</p>
                        </div>
                        <img src={cheetos} alt="" />

                    </div>
                ))}
            </div>

        </div>
    )
}

export default Categories
