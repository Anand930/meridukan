import React from 'react'
import cheetos from '/cheetos.png'
import { useNavigate } from 'react-router-dom'

const Card = ({ item }) => {
    const navigate = useNavigate()
    const handleCardOnClick= (e) =>{
        e.preventDefault();
        navigate(`/product/${item.id}`)
    }
    return (
        <div onClick={handleCardOnClick}>
            <div className='border-2 border-pink-500 mx-2 my-4 rounded-lg cursor-pointer hover:bg-pink-500 hover:text-white md:hover:scale-105 duration-700 w-72 lg:w-72 lg:h-80 flex flex-col items-center'>
                <div className='flex items-center justify-center '>
                    <p className='font-semibold pb-4'>{item.name}</p>
                </div>
                <img  className='object-contain h-60 items-center' src={item.productImage || cheetos} alt="" />
                <div className=''>
                    <p className='flex justify-center pt-2 font-bold'><span className='border-pink-500' ></span>${item.sellingPrice}</p>
                </div>
            </div>
        </div>
    )
}

export default Card
