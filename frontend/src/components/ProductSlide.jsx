import React from 'react'
import Slider from './Slider'
import productSample from '../assets/products.json'


const ProductSlide = ({categoryName}) => {
    let Categories = []
    productSample.forEach((item,i)=>{
       return Categories.push(item.categories)
   })
   console.log(Categories);
    return (
        <div>
            <h1 className='flex justify-start items-center px-5 mt-6 text-2xl font-bold text-pink-600 cursor-pointer'>{categoryName}</h1>
            <div className='my-2 px-5'>
                <Slider item={productSample} />
            </div>
        </div>
    )
}

export default ProductSlide
